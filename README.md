## LinkedIn Experience Checker:

1. get a list of job id's once search results load in a linkedin search
2. for each job_id, get data from
`https://www.linkedin.com/jobs/view/{job_id}/`
3. check for a div with the id job-details, and store its text
4. [API and REGEX Needed] scan the text of each job detail for variations of:
`0-20, +, year(s) | yr(s)`
5. flag the id as containing required experience, store the number of years

```js
results = [
    {
        id: job_id,
        expMentioned: Bool,
        nums: [int] // any numbers before years, yrs, etc.
        level: "Junior" | "Mid" | "Senior" // depending on average of nums
    },
    ...
]
```


I'll need a full-text search or something to
scan the inner text for the following:

### MVP:
```
0-9, +, years, yrs contained in text changes color of listing card in job list view
```
### Stretch:
```
- highlights areas in detail view with a small accuracy likelihood score
- color coded job cards by years required: yellow -> red == 1 -> 6+

- more intelligent search:
    - list of words with various weights, including 'experience', 'proven', etc.
    - maybe some kind of API for this exists already as well
```
