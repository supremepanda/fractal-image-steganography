(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{147:function(e,t,a){},215:function(e,t,a){},216:function(e,t,a){"use strict";a.r(t);var c,s=a(22),r=a.n(s),n=a(37),o=a(0),i=a(222),l=a(65),d=a(33),j=a(218),m=a(71),u=a(226),p=a(221),b=a(224),h=a(122),O=a(130),x=p.a.Title,f=Object(O.a)(x)(c||(c=Object(h.a)(["\n  &&& {\n    font-weight: 800;\n    font-size: 48px;\n  }\n"]))),g=a(7),y=p.a.Title,S=p.a.Paragraph;var I=function(){return Object(g.jsx)(l.a,{style:{marginBottom:24},children:Object(g.jsxs)(d.a,{span:24,children:[Object(g.jsx)(f,{children:"Fractal Image Steganography"}),Object(g.jsx)(y,{level:3,children:"How it works?"}),Object(g.jsx)(S,{children:"Lorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit Amed Lorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit Amed"}),Object(g.jsx)(b.a,{message:"Informational Notes",description:"Lorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit AmedLorem Ipsum Dolor Sit Amed",type:"info",showIcon:!0})]})})},v=a(104),L=a.n(v),k=a(133),D=a(220),w=a(138),A=a(223),T=a(225),P=a(219),F=function(){},E=function(e,t){var a=new FileReader;a.addEventListener("load",(function(){return t(a.result)})),a.readAsDataURL(e)},G=function(e,t,a){var c=t.some((function(t){return e.type===t}));return c||w.b.error(a),c};a(147);var N=function(e){var t=e.onUpload,a=Object(o.useState)(""),c=Object(n.a)(a,2),s=c[0],r=c[1];return Object(g.jsx)(P.a,{listType:"picture-card",showUploadList:!1,customRequest:F,beforeUpload:function(e){var t=G(e,["image/jpg","image/png","image/jpeg"],"You can only upload JPG/PNG file!");return t||P.a.LIST_IGNORE},onChange:function(e){E(e.file.originFileObj,r),t(e.file)},className:"upload-area",children:s?Object(g.jsx)("img",{src:s,alt:"Uploaded image",className:"uploaded-image"}):Object(g.jsxs)("div",{style:{width:"100%"},children:[Object(g.jsx)(T.a,{className:"upload-icon",style:{color:"#1890ff",fontSize:36}}),Object(g.jsxs)("div",{style:{marginTop:16},children:[Object(g.jsx)(p.a.Title,{level:4,children:"Click or drag file to this area to upload"}),Object(g.jsx)(p.a.Text,{type:"secondary",children:"You can only upload JPG/JPEG/PNG file"})]})]})})},U="encode",C="decode";var J=function(e){var t=e.type,a=e.title,c=D.a.useForm(),s=Object(n.a)(c,1)[0],r=Object(o.useState)(""),i=Object(n.a)(r,2),j=i[0],u=i[1],b=Object(o.useState)(!1),h=Object(n.a)(b,2),O=h[0],x=h[1],f=Object(o.useState)(""),y=Object(n.a)(f,2),S=y[0],I=y[1],v=Object(o.useState)(""),P=Object(n.a)(v,2),F=P[0],E=P[1];Object(o.useEffect)((function(){s.resetFields(),G()}),[a]);var G=function(){x(!1),u(""),E(""),I("")},J=function(){var e=Object(k.a)(L.a.mark((function e(a){var c,s,r,n,o,i;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=a.secretKey,s=a.secretMessage,x(!0),r="/decode",(n=new FormData).append("file",j.originFileObj),n.append("secretKey",c),t===U&&(n.append("secretMessage",s),r="/encode"),e.next=9,fetch("".concat("https://fractal-image-steganography.herokuapp.com").concat(r),{method:"POST",body:n});case 9:return o=e.sent,e.next=12,o.json();case 12:o=e.sent,t===U?o.status?(i="data:image/png;base64,".concat(o.data),I(i),w.b.success("".concat(j.name," file encoded successfully"),3)):w.b.error(o.data,3):t===C&&(o.status?(E(o.data),w.b.success("".concat(j.name," file decoded successfully"),3)):w.b.error(o.data,3)),x(!1);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)(D.a,{name:"form-".concat(a),onFinish:J,size:"large",form:s,children:[Object(g.jsxs)(l.a,{gutter:12,children:["encode"===t&&Object(g.jsx)(d.a,{span:12,children:Object(g.jsx)(D.a.Item,{name:"secretMessage",rules:[{required:!0,message:"Please enter a secret message"}],children:Object(g.jsx)(A.a.Password,{placeholder:"Secret message",prefix:Object(g.jsx)(T.a,{}),type:"text"})})}),Object(g.jsx)(d.a,{span:"decode"===t?24:12,children:Object(g.jsx)(D.a.Item,{name:"secretKey",rules:[{required:!0,message:"Please enter the secret key"}],children:Object(g.jsx)(A.a.Password,{placeholder:"Secret key",prefix:Object(g.jsx)(T.a,{}),type:"text"})})})]}),Object(g.jsx)(D.a.Item,{name:"upload",children:Object(g.jsx)(N,{onUpload:u})}),Object(g.jsx)(D.a.Item,{children:Object(g.jsx)(m.a,{type:"primary",htmlType:"submit",block:!0,loading:O,children:a})}),t===U&&S&&Object(g.jsxs)(l.a,{justify:"center",children:[Object(g.jsxs)(p.a.Text,{children:["Image ",t,"d successfully.\xa0"]}),Object(g.jsx)(p.a.Link,{href:S,download:!0,children:"Click to Download"})]}),t===C&&F&&Object(g.jsxs)(l.a,{justify:"center",children:[Object(g.jsx)(p.a.Text,{children:"Your secret message is:\xa0"}),Object(g.jsxs)(p.a.Text,{style:{wordBreak:"break-word"},copyable:!0,mark:!0,children:["\xa0",F,"\xa0"]})]})]})},z=(a(215),i.a.Footer),K=i.a.Content,R=[{key:"0",tab:"Encode"},{key:"1",tab:"Decode"}],q={0:Object(g.jsx)(J,{type:"encode",title:"Encode"}),1:Object(g.jsx)(J,{type:"decode",title:"Decode"})};var B=function(){var e=Object(o.useState)(R[0].key),t=Object(n.a)(e,2),a=t[0],c=t[1];return Object(o.useEffect)((function(){fetch("".concat("https://fractal-image-steganography.herokuapp.com","/are-you-alive"))}),[]),Object(g.jsxs)(i.a,{style:{minHeight:"100vh",paddingTop:24},children:[Object(g.jsxs)(K,{children:[Object(g.jsx)(l.a,{justify:"center",children:Object(g.jsx)(d.a,{xxl:10,xl:14,lg:22,sm:22,xs:22,children:Object(g.jsx)(I,{})})}),Object(g.jsx)(l.a,{justify:"center",children:Object(g.jsx)(d.a,{xxl:10,xl:14,lg:22,sm:22,xs:22,children:Object(g.jsx)(j.a,{headStyle:{paddingTop:24,minHeight:40},tabProps:{type:"card",animated:!0,moreIcon:!0},onTabChange:function(e){return c(e)},style:{width:"100%"},tabList:R,activeTabKey:a,children:q[a]})})})]}),Object(g.jsx)(z,{children:Object(g.jsx)(l.a,{justify:"center",children:Object(g.jsx)(d.a,{children:Object(g.jsxs)(m.a,{type:"link",href:"https://github.com/supremepanda/fractal-image-steganography",target:"_blank",style:{color:"initial",display:"flex",alignItems:"center"},children:[Object(g.jsx)(u.a,{style:{fontSize:18}}),"See on Github"]})})})})]})};r.a.render(Object(g.jsx)(B,{}),document.getElementById("root"))}},[[216,1,2]]]);
//# sourceMappingURL=main.156254ae.chunk.js.map