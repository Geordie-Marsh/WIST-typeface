"use strict";(self.webpackChunktypeface_program=self.webpackChunktypeface_program||[]).push([[206],{907:(e,t,n)=>{n.d(t,{W:()=>r,u:()=>l});var a=n(579);function r(e){let{children:t,onClick:n}=e;return(0,a.jsx)("button",{className:"Button Major",onClick:n,children:(0,a.jsx)("h2",{children:t})})}function l(e){let{children:t,dark:n=!1,onClick:r}=e;return(0,a.jsx)("button",{className:"Button Minor "+(!0===n?"dark":""),onClick:r,children:(0,a.jsx)("p",{children:t})})}},399:(e,t,n)=>{n.d(t,{EY:()=>s,fs:()=>i,wN:()=>o});var a=n(43),r=n(274),l=n(579);function s(e){let{value:t,placeholder:n,onChange:a,minLength:r,maxLength:s}=e,o="";return(t.length<r||t.length>s)&&(o="invalid"),(0,l.jsx)("div",{className:"Input Text",children:(0,l.jsx)("input",{type:"text",value:t,placeholder:n,onChange:e=>a(e.target.value),minLength:r,maxLength:s,className:o})})}function o(e){let{value:t,placeholder:n,onChange:a,min:r,max:s}=e,o="";return(t<r||t>s)&&(o="invalid"),(0,l.jsx)("div",{className:"Input Number",children:(0,l.jsx)("input",{type:"number",value:t,placeholder:n,onChange:e=>a(e.target.value),min:r,max:s,className:o})})}function i(e){let{value:t,placeholder:n,onChange:s,minLength:o,maxLength:i}=e,c="";function u(){let e=(0,r.$$)(".TextArea textarea");e.style.height="10px",e.style.height=e.scrollHeight+4+"px"}return(t.length<o||t.length>i)&&(c="invalid"),(0,a.useEffect)((()=>{window.addEventListener("textareaUpdated",u)}),[]),(0,l.jsx)("div",{className:"Input TextArea",children:(0,l.jsx)("textarea",{value:t,placeholder:n,onChange:e=>{s(e.target.value),u()},minLength:o,maxLength:i,className:c,onInput:u})})}},530:(e,t,n)=>{n.d(t,{A:()=>l});var a=n(43),r=n(579);function l(e){let{options:t,selectedValue:n,onChange:l}=e;const[s,o]=(0,a.useState)(null),i=()=>{o(null)};return(0,r.jsx)("div",{className:"Radio d-flex jc-btwn gap--xs",children:t.map((e=>(0,r.jsx)("div",{className:`Radio__option ${n===e.name?"selected":""} ${s===e.name?"hovered "+e.name:""}`,onClick:()=>{return t=e.name,void(l&&l(t));var t},onMouseEnter:()=>{return t=e.name,void o(t);var t},onMouseLeave:i,children:(0,r.jsx)("p",{children:e.label})},e.name)))})}},206:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m});var a=n(43),r=n(216),l=n(270),s=n(359),o=n(530),i=n(907),c=n(399),u=n(274),d=n(217),h=n(579);function m(e){let{demo:t=!1,alreadyShown:n=!1}=e;const m=(0,r.zy)(),[p,g]=(0,a.useState)(9),[x,v]=(0,a.useState)(!0),[f,y]=(0,a.useState)(!0===t?"Letters are to words. And words are to sentences. And sentences are to ideas. And ideas are to being human.":""),[w,b]=(0,a.useState)(!0),j=200,C=["Letters are to words. And words are to sentences. And sentences are to ideas. And ideas are to being human.","I see a little silhouetto of a man, Scaramouche, Scaramouche, will you do the Fandango? Thunderbolt and lightning, very, very frightening me. (Galileo)","There's a starman waiting in the sky. He'd like to come and meet us but he thinks he'd blow our minds.","If you liked it then you shoulda put a ring on it. Don't be mad once you see that he want it.","Don't go wasting your emotion. Lay all your love on me. Don't go sharing your devotion. Lay all your love on me.","I'm that bad type, make your mama sad type, make your girlfriend mad tight, might seduce your dad type, I'm the bad guy... duh!","I'm a Barbie girl, in the Barbie world. Life in plastic, it's fantastic. You can brush my hair, undress me everywhere. Imagination, life is your creation!"],[N,k]=(0,a.useState)(0),[L,E]=(0,a.useState)(!0===t?"morning":"rainbow"),[S,$]=(0,a.useState)(!0===t?"none":"small"),[I,A]=(0,a.useState)(null),R=(0,a.useRef)("");let T=[];const B=(0,a.useRef)([]),M=(0,a.useRef)(0),D=(0,a.useRef)(0),_=(0,a.useRef)(!1),V=(0,a.useRef)(null),G=(0,a.useRef)(7);let H=[];const U=(0,a.useRef)(!1);function W(){if(t?(0,u.$$)(".letters-cont").style.display="flex":(window.history.pushState({},"","#"+m.pathname),l.os.to(".options-cont",{opacity:0,duration:d.xt,onComplete:()=>{(0,u.$$)(".options-cont").style.display="none",(0,u.$$)(".letters-cont").style.display="flex"}}),(0,u.$$)(".letters-cont").style.opacity=1,window.dispatchEvent(new CustomEvent("settingsInactive"))),p<7||p>11)return void v(!1);if(f.length<12||f.length>j)return void b(!1);U.current=!0,R.current=f,G.current=p,T=R.current.split("");let e="small"===S?"pad--small":"large"===S?"pad--large":"";for(let t=0;t<G.current;t++)H.push((0,h.jsx)("div",{className:"letter-cont "+e,children:(0,h.jsx)(s.A,{reference:"letter"+t,mode:"sentences",colour:L})},t));let a=R.current.split(" ");for(a=a.map((e=>e.split("")));a.length>0;){let e=[],t=a[0].length,n=[];if(t<=G.current){a[0].forEach((t=>{e.push(t)})),n.push(0);for(let t=1;t<a.length;t++){const r=a[t];if(!(e.length+1+r.length<=G.current))break;e.push(" "),r.forEach((t=>{e.push(t)})),n.push(t)}for(;e.length<G.current;)e.push(" ")}else{let t=a[0],n=t.slice(0,G.current);e.push(...n),a[0]=t.slice(G.current)}a=a.filter(((e,t)=>!n.includes(t))),B.current.push(e)}A(H),n||(V.current=setInterval((()=>{if(_.current)return void(_.current=!1);let e=B.current[M.current];window.dispatchEvent(new CustomEvent("letterChangesentencesletter"+D.current,{detail:e[D.current]})),D.current++,D.current>=G.current&&(D.current=0,M.current++,_.current=!0),M.current>=B.current.length&&(M.current=0)}),2e3/G.current))}function Y(){U.current=!1,window.dispatchEvent(new CustomEvent("settingsActive")),l.os.to(".letters-cont",{opacity:0,duration:d.xt,onComplete:()=>{(0,u.$$)(".letters-cont").style.display="none",A(null),clearInterval(V.current),R.current="",T=[],B.current=[],M.current=0,D.current=0,_.current=!1,H=[]}}),(0,u.$$)(".options-cont").style.display="flex",l.os.to(".options-cont",{opacity:1,delay:1.5*d.xt,duration:d.xt})}function z(){U.current&&Y()}return(0,a.useEffect)((()=>(!0===t&&(console.log(n),W()),window.addEventListener("popstate",z),window.addEventListener("settingsClicked--sentences",Y),()=>{window.removeEventListener("popstate",z),window.removeEventListener("settingsClicked--sentences",Y)})),[]),(0,h.jsxs)("div",{className:"Sentences mode-cont",children:[(0,h.jsx)("div",{className:"letters-cont",children:I}),!1===t&&(0,h.jsxs)("div",{className:"options-cont d-flex flex-v ai-c gap--md",children:[(0,h.jsx)("h1",{children:"Sentences options"}),(0,h.jsxs)("div",{className:"d-flex flex-v ai-c gap--sm",children:[(0,h.jsx)("h2",{children:"Number of letters displayed"}),(0,h.jsx)(c.wN,{placeholder:"7",value:p,onChange:e=>{g(e)},min:7,max:11}),(p<7||p>11)&&!x?(0,h.jsxs)("p",{className:"numberInputError",children:["(Number must be between ",7," and ",11,")"]}):""]}),(0,h.jsxs)("div",{className:"d-flex flex-v ai-c gap--sm",children:[(0,h.jsx)("h2",{children:"Sentence to print"}),(0,h.jsxs)("div",{className:"sentence-input-cont d-flex flex-h jc-btwn ai-c gap--sm",children:[(0,h.jsx)(c.fs,{placeholder:"Type here...",value:f,onChange:e=>{y(e)},minLength:12,maxLength:j}),(0,h.jsx)(i.u,{onClick:function(){y(C[N]),k((N+1)%C.length),setTimeout((()=>{window.dispatchEvent(new Event("textareaUpdated"))}),4)},children:"Cycle presets"})]}),(f.length<12||f.length>j)&&!w?(0,h.jsxs)("p",{className:"sentenceInputError",children:["(The sentence must be ",12,"-",j," characters long)"]}):""]}),(0,h.jsxs)("div",{className:"d-flex flex-v ai-c gap--sm",children:[(0,h.jsx)("h2",{children:"Colour"}),(0,h.jsx)(o.A,{options:[{name:"black",label:"Black"},{name:"rainbow",label:"Rainbow"},{name:"morning",label:"Morning"},{name:"daylight",label:"Daylight"},{name:"sunset",label:"Sunset"},{name:"twilight",label:"Twilight"}],selectedValue:L,onChange:e=>{E(e)}})]}),(0,h.jsxs)("div",{className:"d-flex flex-v ai-c gap--sm",children:[(0,h.jsx)("h2",{children:"Gap between letters"}),(0,h.jsx)(o.A,{options:[{name:"none",label:"None"},{name:"small",label:"Small"},{name:"large",label:"Large"}],selectedValue:S,onChange:e=>{$(e)}})]}),(0,h.jsx)(i.W,{onClick:W,children:"Start!"})]})]})}}}]);
//# sourceMappingURL=206.36a3c2cf.chunk.js.map