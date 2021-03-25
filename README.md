# DLC Curation Email Helper

This is a single page app for generating boilerplate emails for ScholarSphere curation. Try it here:

[https://repub.github.io/dlc-curation-emailer/](https://repub.github.io/dlc-curation-emailer/)


## Development

Before you start, make sure you have node installed. 

To install project dependencies:
```bash
# from the project folder
npm install
```

For live preview during development:
```bash
# from the project folder
npm run-script dev
```

To build and deploy to github pages:
```bash
# commit existing work in the main branch
git add -A
git commit -m "describe your changes"

# build the production code (public/build)
npm run-script build

# add the new code to the gh-pages branch
git checkout gh-pages
rm -rf build && mv public/build ./
git commit -a -m "new build"
git push

# go back to main branch
git checkout main
```

