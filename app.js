const axios = require("axios")
const DOMParser = require("dom-parser")
const fs = require("fs")

// for dev purposes - a js equivelant for the python dir method
const dir = (obj) => {
    props = [];
    for (prop in obj) {
        props.push(`${prop}:${typeof(obj[prop])}`);
    }
    props.sort();
    console.log(props)
    return props;
}

const getExperienceInJobListing = async (jobId) => {
    jobContent = await axios.get(`https://www.linkedin.com/jobs/view/${jobId}/`)
        .catch(err => {
            console.log(err)
            return {
                id: jobId,
                expMentioned: false,
                approxExpRequired: 0,
            }
        })

    const parser = new DOMParser()
    const dom = parser.parseFromString(jobContent.data)
    const scripts = dom.getElementsByTagName('script')
    const text = scripts[1].textContent
    const details = JSON.parse(text)

    monthsRequired = details.experienceRequirements ? details.experienceRequirements.monthsOfExperience : 0;
    jobDesc = details.description

    const search = /(\d)\+? (year|yr)|(years|yrs)/g;
    let results = []
    let result;
    do {
        result = search.exec(jobDesc)
        if (result) results.push(result)
    } while (result)

    totalYears = results.reduce((inc, result) => inc += Number(result[1]), 0)
    totalYears += monthsRequired / 12
    avgWeightedYears = totalYears / (results.length + 1)

    return {
        id: jobId,
        expMentioned: results.length > 0,
        approxExpRequired: avgWeightedYears | 0,
    }
}


// getExperience(3136764989)
//     .then(response => console.log(response))
//     .catch(err => console.error(err))


const getJobIdsFromSearchResult = async (url) => {
    const searchResults = await axios.get(url)
        .catch(err => console.error(err))

    const parser = new DOMParser()
    const dom = parser.parseFromString(searchResults.data)
    const listings = dom.getElementsByClassName("base-card")

    const listingIds = listings.map(listing => {
        return listing.attributes[1].value.slice(18);
    })



    return listingIds
}

getJobIdsFromSearchResult("https://www.linkedin.com/jobs/search/?distance=25.0&f_E=2&f_EA=true&geoId=101630962&keywords=python%20developer")
    .then(ids => {
        ids.forEach(async id => {
            const listingInfo = await getExperienceInJobListing(id)
            console.log(listingInfo)
        })
    })
