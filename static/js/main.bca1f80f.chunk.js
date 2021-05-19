(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{147:function(e,t,a){},215:function(e,t,a){},216:function(e,t,a){"use strict";a.r(t);var c,n=a(22),s=a.n(n),r=a(37),i=a(0),o=a(222),d=a(65),l=a(33),j=a(218),b=a(71),h=a(226),u=a(221),p=a(224),m=a(122),g=a(130),f=u.a.Title,x=Object(g.a)(f)(c||(c=Object(m.a)(["\n  &&& {\n    font-weight: 800;\n    font-size: 48px;\n  }\n"]))),O=a(7),y=u.a.Title,k=u.a.Paragraph,v=u.a.Link;var w=function(){return Object(O.jsx)(d.a,{style:{marginBottom:24},children:Object(O.jsxs)(l.a,{span:24,children:[Object(O.jsx)(x,{children:"Fractal Image Steganography"}),Object(O.jsx)(y,{level:3,children:"Behind the Scene"}),Object(O.jsxs)(k,{children:["App embeds message and key to the image. To encode, it changing the some pixels of image with the message and key pixels. To encode, it looking the key pixels and when it is find it decodes the message from it. To do that it converts all message, key and image information to binary format. For furthermore information please visit:\xa0",Object(O.jsx)(v,{href:"https://github.com/supremepanda/fractal-image-steganography#understanding-the-theory-of-backend-side",target:"_blank",children:"here"})]}),Object(O.jsx)(p.a,{message:"How it works?",description:"Select/Drag & Drop your image to decode or encode. Enter your `secret message` and `secret key` for encoding. And keep the `secret key` for decoding the message for later",type:"info",showIcon:!0})]})})},T=a(104),S=a.n(T),I=a(133),P=a(220),F=a(138),E=a(223),D=a(225),G=a(219),L=function(){},N=function(e,t){var a=new FileReader;a.addEventListener("load",(function(){return t(a.result)})),a.readAsDataURL(e)},U=function(e,t,a){var c=t.some((function(t){return e.type===t}));return c||F.b.error(a),c};a(147);var C=function(e){var t=e.onUpload,a=Object(i.useState)(""),c=Object(r.a)(a,2),n=c[0],s=c[1];return Object(O.jsx)(G.a,{listType:"picture-card",showUploadList:!1,customRequest:L,beforeUpload:function(e){var t=U(e,["image/jpg","image/png","image/jpeg"],"You can only upload JPG/PNG file!");return t||G.a.LIST_IGNORE},onChange:function(e){N(e.file.originFileObj,s),t(e.file)},className:"upload-area",children:n?Object(O.jsx)("img",{src:n,alt:"Uploaded image",className:"uploaded-image"}):Object(O.jsxs)("div",{style:{width:"100%"},children:[Object(O.jsx)(D.a,{className:"upload-icon",style:{color:"#1890ff",fontSize:36}}),Object(O.jsxs)("div",{style:{marginTop:16},children:[Object(O.jsx)(u.a.Title,{level:4,children:"Click or drag file to this area to upload"}),Object(O.jsx)(u.a.Text,{type:"secondary",children:"You can only upload JPG/JPEG/PNG file"})]})]})})},J="encode",z="decode";var B=function(e){var t=e.type,a=e.title,c=P.a.useForm(),n=Object(r.a)(c,1)[0],s=Object(i.useState)(""),o=Object(r.a)(s,2),j=o[0],h=o[1],p=Object(i.useState)(!1),m=Object(r.a)(p,2),g=m[0],f=m[1],x=Object(i.useState)(""),y=Object(r.a)(x,2),k=y[0],v=y[1],w=Object(i.useState)(""),T=Object(r.a)(w,2),G=T[0],L=T[1];Object(i.useEffect)((function(){n.resetFields(),N()}),[a]);var N=function(){f(!1),h(""),L(""),v("")},U=function(){var e=Object(I.a)(S.a.mark((function e(a){var c,n,s,r,i,o;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=a.secretKey,n=a.secretMessage,f(!0),s="/decode",(r=new FormData).append("file",j.originFileObj),r.append("secretKey",c),t===J&&(r.append("secretMessage",n),s="/encode"),e.next=9,fetch("".concat("https://fractal-image-steganography.herokuapp.com").concat(s),{method:"POST",body:r});case 9:return i=e.sent,e.next=12,i.json();case 12:i=e.sent,t===J?i.status?(o="data:image/png;base64,".concat(i.data),v(o),F.b.success("".concat(j.name," file encoded successfully"),3)):F.b.error(i.data,3):t===z&&(i.status?(L(i.data),F.b.success("".concat(j.name," file decoded successfully"),3)):F.b.error(i.data,3)),f(!1);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(O.jsxs)(P.a,{name:"form-".concat(a),onFinish:U,size:"large",form:n,children:[Object(O.jsxs)(d.a,{gutter:12,children:["encode"===t&&Object(O.jsx)(l.a,{span:12,children:Object(O.jsx)(P.a.Item,{name:"secretMessage",rules:[{required:!0,message:"Please enter a secret message"}],children:Object(O.jsx)(E.a.Password,{placeholder:"Secret message",prefix:Object(O.jsx)(D.a,{}),type:"text"})})}),Object(O.jsx)(l.a,{span:"decode"===t?24:12,children:Object(O.jsx)(P.a.Item,{name:"secretKey",rules:[{required:!0,message:"Please enter the secret key"}],children:Object(O.jsx)(E.a.Password,{placeholder:"Secret key",prefix:Object(O.jsx)(D.a,{}),type:"text"})})})]}),Object(O.jsx)(P.a.Item,{name:"upload",children:Object(O.jsx)(C,{onUpload:h})}),Object(O.jsx)(P.a.Item,{children:Object(O.jsx)(b.a,{type:"primary",htmlType:"submit",block:!0,loading:g,children:a})}),t===J&&k&&Object(O.jsxs)(d.a,{justify:"center",children:[Object(O.jsxs)(u.a.Text,{children:["Image ",t,"d successfully.\xa0"]}),Object(O.jsx)(u.a.Link,{href:k,download:!0,children:"Click to Download"})]}),t===z&&G&&Object(O.jsxs)(d.a,{justify:"center",children:[Object(O.jsx)(u.a.Text,{children:"Your secret message is:\xa0"}),Object(O.jsxs)(u.a.Text,{style:{wordBreak:"break-word"},copyable:!0,mark:!0,children:["\xa0",G,"\xa0"]})]})]})},K=(a(215),o.a.Footer),R=o.a.Content,q=[{key:"0",tab:"Encode"},{key:"1",tab:"Decode"}],A={0:Object(O.jsx)(B,{type:"encode",title:"Encode"}),1:Object(O.jsx)(B,{type:"decode",title:"Decode"})};var H=function(){var e=Object(i.useState)(q[0].key),t=Object(r.a)(e,2),a=t[0],c=t[1];return Object(i.useEffect)((function(){fetch("".concat("https://fractal-image-steganography.herokuapp.com","/are-you-alive"))}),[]),Object(O.jsxs)(o.a,{style:{minHeight:"100vh",paddingTop:24},children:[Object(O.jsxs)(R,{children:[Object(O.jsx)(d.a,{justify:"center",children:Object(O.jsx)(l.a,{xxl:10,xl:14,lg:22,sm:22,xs:22,children:Object(O.jsx)(w,{})})}),Object(O.jsx)(d.a,{justify:"center",children:Object(O.jsx)(l.a,{xxl:10,xl:14,lg:22,sm:22,xs:22,children:Object(O.jsx)(j.a,{headStyle:{paddingTop:24,minHeight:40},tabProps:{type:"card",animated:!0,moreIcon:!0},onTabChange:function(e){return c(e)},style:{width:"100%"},tabList:q,activeTabKey:a,children:A[a]})})})]}),Object(O.jsx)(K,{children:Object(O.jsx)(d.a,{justify:"center",children:Object(O.jsx)(l.a,{children:Object(O.jsxs)(b.a,{type:"link",href:"https://github.com/supremepanda/fractal-image-steganography",target:"_blank",style:{color:"initial",display:"flex",alignItems:"center"},children:[Object(O.jsx)(h.a,{style:{fontSize:18}}),"See on Github"]})})})})]})};s.a.render(Object(O.jsx)(H,{}),document.getElementById("root"))}},[[216,1,2]]]);
//# sourceMappingURL=main.bca1f80f.chunk.js.map