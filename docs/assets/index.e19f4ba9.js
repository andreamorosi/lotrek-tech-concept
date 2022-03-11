import{V as he,T as ye,P as fe,S as ge,D as we,A as xe,a as ve,b,M,c as z,R as _e,W as be,d as Me,e as ze,O as Le,f as d,E as u,u as Ce,C as Se,B as Pe,g as G,h as N,i as qe,j as Ie,k as Te}from"./vendor.43f13519.js";const Oe=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))x(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&x(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function x(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}};Oe();function Ee(){let L,i,s,x,t,r,l,m=document.querySelector("#sceneCanvas"),V=new Se,O,c=0;var B=!1,W,n=[],a,Q,E,o=null,R=!0;const k=new he,X=new ye().load("assets/images/particle.png"),e={};e.count=1e4,e.size=.3,e.radius=5,e.branches=8,e.spin=1,e.randomness=.3,e.randomnessPower=5,e.stars=600,e.starColor="#1b3984",e.insideColor="#3776ff",e.outsideColor="#935CF2",Y(),j();function Y(){i=new fe(70,m.clientWidth/m.clientHeight,1,1e4),i.position.set(1,1,100),i.lookAt(0,0,0),Q={x:i.position.x,y:i.position.y,z:i.position.z},s=new ge;const p=new we(16777215,1);p.position.set(20,-20,100).normalize(),s.add(p);const C=new xe(4210752);s.add(C);const S=new ve(4210752,2,500,2);S.position.set(-75,25,-5),s.add(S);const F=new b(20,64,32),v=new M({color:9657586});console.log(v),v.transparent=!0,v.opacity=.9,a=new z(F,v),s.add(a),a.position.x=0,a.position.y=0,a.position.z=24,a.scale.set(3,3,3),a.material.opacity=0,a.txtInfo="mainPlanet text";const U=new b(8,64,32),ee=new M({color:9657586});var y=new z(U,ee);s.add(y),y.position.x=-25,y.position.y=11,y.position.z=30,y.scale.set(0,0,0),y.txtInfo="planetOne text",n.push(y);const te=new b(8,64,32),oe=new M({color:9657586});var f=new z(te,oe);s.add(f),f.position.x=-11,f.position.y=-6,f.position.z=46,f.scale.set(0,0,0),f.txtInfo="planetTwo text",n.push(f);const ne=new b(8,64,32),ie=new M({color:9657586});var g=new z(ne,ie);s.add(g),g.position.x=16,g.position.y=14,g.position.z=30,g.scale.set(0,0,0),g.txtInfo="planetThree text",n.push(g);const ae=new b(8,64,32),se=new M({color:9657586});var w=new z(ae,se);s.add(w),w.position.x=22,w.position.y=-10,w.position.z=30,w.scale.set(0,0,0),w.txtInfo="planetFour text",n.push(w),debug.push(a),debug.push(n),camero=i,console.log(debug);let _=null,A=null;function re(){o!==null&&(_.dispose(),A.dispose(),s.remove(o)),_=new Pe;const P=new Float32Array(e.count*3),q=new Float32Array(e.count*3),le=new G(e.insideColor),de=new G(e.outsideColor);for(let h=0;h<e.count;h++){const I=Math.random()*e.radius,H=h%e.branches/e.branches*2*Math.PI,D=I*e.spin,ue=Math.pow(Math.random(),e.randomnessPower)*(Math.random()<.5?1:-1),pe=Math.pow(Math.random(),e.randomnessPower)*(Math.random()<.5?1:-1),me=Math.pow(Math.random(),e.randomnessPower)*(Math.random()<.5?1:-1);P[h*3]=Math.sin(H+D)*I*15+ue,P[h*3+1]=pe*15,P[h*3+2]=Math.cos(H+D)*I*15+me;const T=le.clone();T.lerp(de,I/e.radius),q[h*3+0]=T.r,q[h*3+1]=T.g,q[h*3+2]=T.b}_.setAttribute("position",new N(P,3)),_.setAttribute("color",new N(q,3)),A=new qe({color:"white",size:e.size,depthWrite:!1,sizeAttenuation:!0,blending:Ie,vertexColors:!0,transparent:!0,alphaMap:X}),o=new Te(_,A),o.rotation.x=.15,o.rotation.z=-.25,o.material.opacity=0,o.scale.set(0,0,0),console.log(o),s.add(o)}re(),x=new _e,t=new be({alpha:!0,antialias:!0}),t.setPixelRatio(window.devicePixelRatio),t.setSize(m.clientWidth,m.clientHeight),m.appendChild(t.domElement),L=new Me,document.querySelector("body").appendChild(L.dom),setTimeout(()=>{console.log("controls ready"),r=new ze([...s.children],i,t.domElement),r.addEventListener("drag",$),r.enabled=!0},1e3),E=new Le(i,t.domElement),controlz=E,document.addEventListener("mousemove",Z),document.addEventListener("dblclick",J),window.addEventListener("resize",K),B===!1&&(W=setInterval(()=>{document.querySelector(".scene__one").classList.contains("disabled")&&(B=!0,clearInterval(W),console.log("attivi"),document.querySelector(".head").classList.add("active"),document.querySelector(".head__inner").classList.add("active"),document.querySelector(".head__title").classList.add("active"),document.querySelector(".head__title").innerText="break it! quick!",new d(o.material).to({opacity:1},750).easing(u.Quadratic.In).start(),new d(o.scale).to({x:1,y:1,z:1},500).easing(u.Quadratic.Out).start(),new d(a.material).to({opacity:1},750).easing(u.Quadratic.In).start(),new d(a.scale).to({x:1,y:1,z:1},500).easing(u.Quadratic.In).start(),setTimeout(()=>{document.querySelector(".scene__two__floating").classList.add("active")},500))},500)),document.querySelector(".scene__two__btn").addEventListener("click",()=>{document.querySelector(".scene__two__btn").classList.add("clicked"),document.querySelector(".head__inner").classList.remove("active"),document.querySelector(".head__title").classList.remove("active"),document.querySelector(".head__title").innerText="pick a planet",setTimeout(()=>{document.querySelector(".head__inner").classList.add("active"),document.querySelector(".head__title").classList.add("active")},500),new d(a.material).to({opacity:0},450).easing(u.Quadratic.In).start(),new d(a.scale).to({x:3,y:3,z:3},250).easing(u.Quadratic.In).onComplete(()=>{a.visible=!1,a.scale.set(0,0,0),ce()}).start()});function ce(){new d(y.scale).to({x:1,y:1,z:1},500).easing(u.Back.Out).start(),new d(f.scale).to({x:1,y:1,z:1},250).easing(u.Back.Out).start(),new d(g.scale).to({x:1,y:1,z:1},750).easing(u.Back.Out).start(),new d(w.scale).to({x:1,y:1,z:1},625).easing(u.Back.Out).start(),e.insideColor="#ff3c00",new d(o.scale).to({x:1.5,y:1.5,z:2.5},350).easing(u.Quadratic.In).start(),new d(o.material.color).to({r:.95,g:.25,b:.25},350).easing(u.Quadratic.In).start(),o.rotation.x=o.rotation.x+.1,o.rotation.z=o.rotation.z-.1,R=!1,punti=o}}function K(){i.aspect=m.clientWidth/m.clientHeight,i.updateProjectionMatrix(),t.setSize(m.clientWidth,m.clientHeight)}function Z(p){const{top:C,left:S,width:F,height:v}=t.domElement.getBoundingClientRect();k.x=(p.clientX-S)/F*2-1,k.y=-((p.clientY-C)/v)*2+1}function J(p){console.log(l),document.querySelector(".ghostinfo").innerHTML=`
    <div><em>name</em>: ${l.txtInfo}</div>
    <div><em>position</em>: x = ${l.position.x}, y = ${l.position.y}, z = ${l.position.z}</div>
    <div><em>scale</em>: x = ${l.scale.x}, y = ${l.scale.y}, z = ${l.scale.z}</div>
    `,console.log(Q)}function j(){requestAnimationFrame(j),Ce(),E.update(),$(),L.update()}function $(){c+=.01,i.lookAt(s.position),i.updateMatrixWorld(),x.setFromCamera(k,i),V.getElapsedTime(),a.position.x=a.position.x+Math.sin(c)*.025,a.position.y=a.position.y+Math.sin(c)*.025,n[0].position.x=n[0].position.x+Math.sin(c)*-.0125,n[0].position.y=n[0].position.y+Math.sin(c)*.0125,n[1].position.x=n[1].position.x+Math.cos(c)*.0125,n[1].position.y=n[1].position.y+Math.cos(c)*.0125,n[2].position.x=n[2].position.x+Math.sin(c)*.0125,n[2].position.y=n[2].position.y+Math.cos(c)*-.0125,n[3].position.x=n[3].position.x+Math.cos(c)*-.0125,n[3].position.y=n[3].position.y+Math.sin(c)*.0125,R?o.rotation.y=c*-.05:o.rotation.y=c*-.01,o.rotation.x=o.rotation.x+Math.sin(c)*1e-5,o.rotation.z=o.rotation.z+Math.cos(c)*1e-5,n.forEach(C=>{});const p=x.intersectObjects(s.children,!1);p.length>0?O!=p[0].object&&(O=p[0].object,l=p[0].object):O=null,t.render(s,i)}}setTimeout(()=>{document.querySelector(".scene__one").classList.add("disabled"),document.querySelector(".scene__one__left").classList.add("first-state"),document.querySelector(".scene__one__right").classList.add("first-state")},2e3);Ee();
