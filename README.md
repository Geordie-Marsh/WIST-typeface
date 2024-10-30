# Navigating the code
Welcome! 
This project is coded using React, SCSS and JavaScript. Because it's a React single-page app, it's structured differently to normal HTML-CSS-JS websites. 

## File structure
You'll find everything I've coded in the `src` folder. 
The code for the various pages of the site are under the `pages` folder. The top-level pages like Home, About, etc. are directly here, whilst pages for the various modes like Tessellation and the mock-ups is under the folder `modes`. 
The code for repeated elements that are added onto multiple different pages, called components, are under the `components` folder. 
Note: The layout and functionality of pages and components are defined using JavaScript and JSX in the `.jsx` files; the styling for each page or component is in the associated `.scss` file. 

## Understanding how the files interact
The page is structured top-down. The most top-level file is `src/index.html` which is a boilerplate HTML file for React projects. This file is what 'holds' the website. 
Next down the chain is `src/App.jsx` which governs the entirety of the React app, from browser routing (URL management, using HashRouter), page transitions and consolidating all the JSX and styling. 
Then, we have `src/pages/Base.jsx`. This page acts as a base layout for all the other pages of the website, ensuring consistency. Technically this could be in App.jsx but for clarity it's good practice to keep it separated.
From here all the other pages will be dynamically injected into the site depending on the browser URL. 

For styling, I've used SCSS. This is very similar to CSS and is mostly inter-legible, but SCSS has some powerful advantages and time-savers compared to traditional CSS.
All global style files (i.e., those that affect the entire site) are under the folder `src/styles`. The file `main.scss` is the master style file and links together _every_ other style file across the site, including page- and component-specific ones. 

## Finding key files
Some key files you might want to see are:
* `src/pages/modes/LetterGrid.jsx`: This component is the actual letters of the Cascadence typeface you see. Every different letter is a different instance of this component. This is a long file (almost 3000 lines, 75,000 characters) with a lot of functionality. It's fundamentally an SVG (which is found at the very bottom), and there are various functions to manipulate each part of the SVG to create different letters and animate between them. 
* `src/pages/Home.jsx`: This is the homepage
* `src/pages/modes/Tessellation.jsx`, `src/components/IndividualLetter.jsx`, `src/components/Sentences.jsx`, `src/components/WordSnake.jsx`: These 4 files are the 'playground' pages. They contain a lot of functionality surrounding how the playground itself actually works, like with changing letters and animations. 

## Understanding React
React seems really complicated at first and that's mostly because it works oppositely to how traditional programming works. In a normal HTML-CSS-JS website, you build as you go and you often end up with a lot of repeated code and inconsistencies. 
React, however, is _declerative_, meaning you first set up all the components and everything that will be used site-wide and then you systematically place them into pages. This fits much better with modern web design practices, namely with component-based architecture (which is also what Figma is based off). 
Inside a given React file (.jsx with a capital letter at the start, e.g., `Home.jsx`) you'll first see a bunch of 'imports' which is just telling the browser what components and assets will be used in this file. Then you'll see something along the lines of `export default function Home() {` which is essentially the container for this React code that can be injected into other areas of the site.
Inside this function, you may first see normal JavaScript which defines any functionality within the component/page, and underneath at the bottom there'll be a `return (` which is where the JSX (React's equivalent to HTML) is declared. This JSX defines the elements of the page/component. To differentiate between React- and non-React elements, HTML elements begin with a lowercase, like `<div>` and React elements start with a capital, like `<Home>`. 
