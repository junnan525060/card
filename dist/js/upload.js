"use strict";function uploadImages(){return new Promise(function(e,n){var o=document.querySelectorAll(".edit-image"),t=[],a=new FormData;if(o.length)if(o.forEach(function(e){var n=window.getComputedStyle(e).backgroundImage,o=n.replace(/url\("/,"").replace(/"\)/,"");/^data:image\/\w+;base64,/.test(o)&&(a.append("editImg",o),t.push(e))}),a.has("editImg")){var r=new XMLHttpRequest;r.onload=function(){for(var n=JSON.parse(r.responseText),o=0;o<t.length;o++)t[o].style.backgroundImage='url("/tempImg/'+n[o]+'")';e("uploadImages is ok")},r.open("POST","/uploadImages",!0),r.send(a)}else e("uploadImages is ok")})}function uploadCover(){return new Promise(function(e,n){function o(n,o,t){html2canvas(n[o]).then(function(a){var u=a.toDataURL();if(r.append("coverImg",u),t||(n[o].style.display="none"),o==n.length-2){console.log(o);var s=new XMLHttpRequest;s.open("POST","/uploadCovers",!0),s.send(r),s.onload=function(){e(JSON.parse(s.responseText))}}})}var t=document.querySelector(".side-front"),a=document.querySelector(".side-back"),r=new FormData(form),u=[];t&&u.push(t),a&&u.push(a);for(var s=0;s<u.length;s++)"none"==window.getComputedStyle(u[s]).display?(u[s].style.display="block",o(u,s,!1)):o(u,s,!0)})}function uploadDom(e){return new Promise(function(n,o){var t=document.querySelector(".side-front"),a=document.querySelector(".side-back"),r=e[1],u=e[0],s=document.querySelector("#form"),c=new FormData(s);c.append("sideFront",t.innerHTML),c.append("sideBack",a.innerHTML),c.append("coverFront",r),c.append("coverBack",u);var l=new XMLHttpRequest;l.onload=function(){console.log(l.responseText)},l.open("POST","/uploadDom",!0),l.send(c)})}var submitButton=document.querySelector(".submit"),popCancel=document.querySelector(".pop-cancel"),mask=document.querySelector(".mask");submitButton.addEventListener("click",function(){mask.style.display="flex"}),popCancel.addEventListener("click",function(){mask.style.display="none",console.log(3)});var popComfirmButton=document.querySelector(".pop-confirm");popComfirmButton.addEventListener("click",function(){mask.style.display="none",uploadImages().then(function(e){return uploadCover()}).then(function(e){uploadDom(e)})});