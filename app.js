console.log('hi!')

// const dir = (obj) => {
//     props = [];
//     for (prop in obj) {
//         props.push(`${prop}:${typeof(obj[prop])}`);
//     }
//     props.sort();
//     console.log(props)
//     return props;
// }

// const identifyError = (err) => {
//     if (err instanceof TypeError) {
//         return "REGEX issue in the DOM parser module:: ";
//     } else if (err instanceof SyntaxError) {
//         return "JSON format issue when parsing script content:: ";
//     }
// }

// const getExperienceInJobListing = async (jobId) => {
//     // Load the job detail page using jobId to complete the URL
//     let jobContent = await axios.get(`https://www.linkedin.com/jobs/view/${jobId}/`)
//         .catch(err => {
//             // console.log(err)
//             return {
//                 id: jobId,
//                 expMentioned: false,
//                 approxExpRequired: 0,
//                 success: false,
//                 status: err.status,
//             }
//         })

//     //
//     try {
//         // set up a dom parser and find the job details
//         // linkedin uses scripting to saturate the html with job details
//         // so I'm extracting the script that contains said details
//         const parser = new DOMParser()
//         const dom = parser.parseFromString(jobContent.data)
//         const scripts = dom.getElementsByTagName('script')
//         const text = scripts[1].textContent

//         // job details are JSON formatted
//         // I'm parsing the JSON data and then using regex
//         // and an object property I found to calculate
//         // an estimate of the actual experience required
//         const details = JSON.parse(text)
//         // there's a 'hidden' monthsOfExperience property which I'm grabbing to use for later
//         const monthsRequired = details.experienceRequirements ? details.experienceRequirements.monthsOfExperience : 0;
//         const jobDesc = details.description
//         const search = /(\d)\+? y(ea)?rs?/g;
//         let results = []

//         // using a do while loop to grab every instance of the above REGEX
//         let result;
//         do {
//             result = search.exec(jobDesc)
//             if (result) results.push(result)
//         } while (result)

//         // averaging together every mention of years and the 'hidden' experience requirement
//         totalYears = results.reduce((inc, result) => inc += Number(result[1]), 0)
//         totalYears += monthsRequired / 12
//         avgWeightedYears = totalYears / (results.length + 1)

//         return {
//             id: jobId,
//             expMentioned: results.length > 0,
//             approxExpRequired: avgWeightedYears | 0,
//             success: true,
//             status: "successful"
//         }
//     } catch (err) {
//         // there's two common errors that currently occur
//         // my identifyError function just adds a little info about the error that has occurred
//         // and returns an 'error' version of the final formatted data to keep the program running
//         errorMessage = identifyError(err)

//         return {
//             id: jobId,
//             expMentioned: undefined,
//             approxExpRequired: 0,
//             success: false,
//             status: errorMessage + String(err),
//         }
//     }



// }

// // This scans the search results page for the id of every job mentioned
// export const getJobIdsFromSearchResult = async (url) => {
//     const searchResults = await axios.get(url)
//         .catch(err => console.error(err))

//     const parser = new DOMParser()
//     const dom = parser.parseFromString(searchResults.data)
//     const listings = dom.getElementsByClassName("base-card")

//     const listingIds = listings.map(listing => {
//         return listing.attributes[1].value.slice(18);
//     })

//     return listingIds
// }

// const url = window.location.href();
// console.log(url);

// let listings = []
// getJobIdsFromSearchResult(url)
//     .then(async ids => {
//         console.log(ids)
//         for (id of ids) {
//             const listingInfo = await getExperienceInJobListing(id)
//             listings.push(listingInfo)
//         }
//         console.log(listings)
//     })
//     .catch(err => console.error(err))