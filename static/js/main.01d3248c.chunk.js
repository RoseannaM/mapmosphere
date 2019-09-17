(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{153:function(e,t,n){},154:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(29),i=n.n(o),s=n(8),c=(n(99),n(2)),l=n(3),u=n(6),d=n(4),m=n(5),p=n(39),h=n.n(p),g=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={videoURL:h.a},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("video",{loop:!0,muted:!0,autoPlay:!0,playsInline:!0,playbackRate:.5,poster:h.a},r.a.createElement("source",{src:h.a,type:"video/mp4"}))}}]),t}(a.Component),f=n(81),b=n(59),v=n(35),E=n(36),y=n(38),j=n(19),k=(n(100),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleClose=function(e){var t=e.target.className;"modal"!==t&&"modal-btn"!==t&&"fa fa-times"!==t||n.props.history.push("/")},n.props=n.props,n.modalDiv=r.a.createRef(),n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.children,n=(e.onScroll,e.error),a=e.formName;return r.a.createElement("div",null,r.a.createElement("div",{onClick:this.handleClose,className:"modal",ref:this.modalDiv},r.a.createElement("section",{id:this.props.id,onScroll:this.props.scroll,className:"modal-main"},r.a.createElement("p",null,n),r.a.createElement("h3",null,a),t)))}}]),t}(a.Component)),O=Object(j.e)(k),S=n(16),w=n(37),C=n(18),N=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).handleLike=function(e){e.preventDefault();var t=n.props,a=t.liked,r=t.message_id,o=n.props.session.id,i={liked:a,message_id:r,user_id:o};fetch("http://0.0.0.0:5000/spirit/api/v1.0/messages/"+r+"/like",{credentials:"include",method:a?"DELETE":"POST",body:JSON.stringify(i),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json().then(function(t){if(e.ok){var o=!a;n.props.likeMessage(r,o)}})}).catch(function(e){return console.error("Error:",e)})},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.session,n=e.liked,a=e.text,o=e.city,i=(e.country,e.message_id),c=t.logged_in;return r.a.createElement(O,{id:"message-popup-modal"},r.a.createElement("div",{className:"message"},r.a.createElement("p",null,a)),c&&r.a.createElement("button",{className:"like-btn",onClick:this.handleLike},r.a.createElement(S.a,{icon:n&&C.a||w.a})),o&&r.a.createElement("button",{className:"images-btn"},r.a.createElement(s.b,{to:"/images/".concat(i,"/").concat(o)},r.a.createElement(S.a,{icon:w.b}))))}}]),t}(a.Component),x=n(90),M=function(){return new Promise(function(e,t){"geolocation"in navigator?navigator.geolocation.getCurrentPosition(function(t){var n=t.coords.latitude,a=t.coords.longitude;fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(a,",").concat(n,".json?types=place,region,country&access_token=").concat("pk.eyJ1Ijoicm9zZWFubmFtIiwiYSI6ImNqeWdrd2R2cTAyNHMzbW8wZmNqd2NnNjgifQ.NhBR5dNoezc0iAqQ-10pIA")).then(function(e){return e.json()}).then(function(t){var r=Object(x.a)(t.features,3),o=r[0],i=r[1],s=r[2];e({lat:n,lng:a,city:o,state:i,country:s})})}):t("Sorry, browser does not support geolocation!")}).then(function(e){return console.log(e),fetch("http://0.0.0.0:5000/spirit/api/v1.0/set/location",{credentials:"include",method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})}).then(function(e){return e.json().then(function(t){if(e.ok)return t})}).catch(function(e){alert(e)})},D=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).getUserLocation=function(){n.setState({location:M()})},n.handleSubmit=function(e){e.preventDefault(),n.state.location.then(function(e){var t=e.lat,a=e.lng,r=e.city,o=e.state,i=e.country,s={messageText:n.state.messageData,lng:a,lat:t,city:r?r.text:null,state:o?o.text:null,country:i?i.text:null};n.props.history.push("/"),fetch("http://0.0.0.0:5000/spirit/api/v1.0/message",{credentials:"include",method:"POST",body:JSON.stringify(s),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json().then(function(t){e.ok&&(console.log("Success:",JSON.stringify(t)),n.props.addMessage(t))})}).catch(function(e){return console.error("Error:",e)})})},n.handleChange=function(e){n.setState({messageData:e.target.value})},n.state={location:{},messageData:""},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getUserLocation()}},{key:"render",value:function(){return r.a.createElement(O,{id:"message-modal"},r.a.createElement("div",{className:"message"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("h3",null,"Write Message:"),r.a.createElement("textarea",{name:"message",rows:"5",cols:"30",type:"text",value:this.state.messageData,onChange:this.handleChange}),r.a.createElement("input",{className:"btn",type:"submit",value:"Submit"}))))}}]),t}(a.Component),L=Object(j.e)(D),F=n(84),P=n.n(F);function T(){var e=Object(E.a)(["\n  background: white;\n  color: #3f618c;\n  font-weight: 400;\n  padding: 5px;\n  border-radius: 2px;\n"]);return T=function(){return e},e}y.a.div(T());var I=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleChange=function(e){n.setState({messageData:e.target.value})},n.state={loading:!0,images:[],messageData:""},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,t="http://0.0.0.0:5000/spirit/api/v1.0/images/"+this.props.city;fetch(t,{credentials:"include"}).then(function(e){return e.json()}).then(function(t){var n=t.graphql.location.edge_location_to_media.edges.slice(0,9);e.setState({images:n,loading:!1})})}},{key:"render",value:function(){var e=this.state,t=e.images,n=e.loading;return r.a.createElement("div",null,r.a.createElement(O,{id:"images-modal"},n?r.a.createElement("img",{id:"globe-spinner",alt:"globe spinning loader",src:P.a}):r.a.createElement("div",{className:"images"},r.a.createElement("div",{className:"images-grid-layout"},t.length>0&&t.map(function(e,t){return r.a.createElement("div",{className:"image",key:t},r.a.createElement("img",{alt:"intagram",className:"image-wrapper",src:e.node.display_url}))})))))}}]),t}(a.Component),_=Object(j.e)(I),z=n(17);n(7);function J(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?J(n,!0).forEach(function(t){Object(f.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):J(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function A(){var e=Object(E.a)(["\n  background: white;\n  color: #03a9f4;\n  font-weight: 500;\n  font-size: 1.2em;\n  padding: 5px;\n  border-radius: 2px;\n  line-height: 1.6;\n"]);return A=function(){return e},e}var W={position:"absolute",top:"8%",left:"5%",width:"90%",height:"85%",flex:1,border:"3px solid rgba(255, 0, 212, 0.79)",boxShadow:"1px 1px 8px 4px rgba(188, 8, 232, 0.8)",borderRadius:"4px"},q=y.a.div(A()),B={clusterMarker:{width:30,height:30,borderRadius:"50%",backgroundColor:"#e147dc",boxShadow:"rgb(225, 71, 220) 0 0 6px 3px",display:"flex",justifyContent:"center",alignItems:"center",color:"white",cursor:"pointer"},marker:{width:30,height:30,borderRadius:"50%",backgroundColor:"#E0E0E0",display:"flex",justifyContent:"center",alignItems:"center",border:"2px solid #C9C9C9"}},U={"circle-blur":.5,"circle-color":"#e147dc","circle-radius":8,"circle-stroke-width":4,"circle-stroke-color":"#e147dc","circle-stroke-opacity":.5},H=Object(z.g)({accessToken:"pk.eyJ1Ijoicm9zZWFubmFtIiwiYSI6ImNqeWdrd2R2cTAyNHMzbW8wZmNqd2NnNjgifQ.NhBR5dNoezc0iAqQ-10pIA"}),Q=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).clusterMarker=function(e,t,a){return r.a.createElement(z.d,{key:e.toString(),coordinates:e,style:B.clusterMarker,onClick:n.clusterClick.bind(Object(v.a)(n),e,t,a)},r.a.createElement("div",null,t))},n.onMove=function(){n.state.popup&&n.setState({popup:void 0})},n.clusterClick=function(e,t,a,r){r.stopPropagation(),n.setState({popup:{coordinates:e,total:t,leaves:a()}})},n.createCoord=function(e){return n.markerGeoJson.features.find(function(e){return e.properties.id===n.clickedFeature}).geometry.coordinates},n.addMessage=function(e){n.setState({geojson:{features:[].concat(Object(b.a)(n.state.geojson.features),[e])}})},n.likeMessage=function(e,t){var a=n.getFeature(n.state.geojson,e);n.setState({geojson:{features:[].concat(Object(b.a)(n.state.geojson.features.filter(function(e){return e!==a})),[R({},a,{properties:R({},a.properties,{liked:t})})])}})},n.getFeature=function(e,t){return e.features.find(function(e){return e.properties.id===t})},n.shortenText=function(e){return e.length>20?(console.log(e.substring(0,20)),e.substring(0,20)+"..."):e},n.zoom=[9],n.center=[-13.007812,40.979898],n.markerClick=function(e){n.setState({clickedFeature:e.properties.id}),n.props.history.push("/view-message/"+e.properties.id)},n.handleMapClick=function(e){n.setState({clickedFeature:void 0})},n.onStyleLoad=function(e){var t=n.props.onStyleLoad;return t&&t(e)},n.state={geojson:{features:[]},popup:void 0,zoom:[1.5],clickedFeature:void 0},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("http://0.0.0.0:5000/spirit/api/v1.0/geojson.json",{credentials:"include"}).then(function(e){return e.json()}).then(function(t){e.setState({geojson:t})}),this.setState({zoom:[10]})}},{key:"render",value:function(){var e=this,t=this.state,n=t.popup,a=t.geojson,o=(t.clickedFeature,this.props.session);return r.a.createElement("div",null,r.a.createElement(H,{onClick:this.handleMapClick,onMove:this.onMove,zoom:this.state.zoom,style:"mapbox://styles/mapbox/streets-v9",center:this.center,containerStyle:W,onStyleLoad:this.onStyleLoad,renderChildrenInPortal:!0},r.a.createElement(z.f,{position:"bottom-left"}),r.a.createElement(z.a,{ClusterMarkerFactory:this.clusterMarker,radius:10},a.features.map(function(e,t){return r.a.createElement(z.b,{key:t,style:B.marker,coordinates:e.geometry.coordinates,"data-feature":e},r.a.createElement("div",{title:e.properties.id},e.properties.id))})),n&&r.a.createElement(z.e,{offset:[0,-10],coordinates:n.coordinates},r.a.createElement(q,null,n.leaves.map(function(t,n){return r.a.createElement("div",{className:"popup-link",id:n,onClick:e.markerClick.bind(e,t.props["data-feature"]),key:n},e.shortenText(t.props["data-feature"].properties.text))}),n.total>n.leaves.length?r.a.createElement("div",null,"And more..."):null)),r.a.createElement(z.c,{type:"circle",id:"cluster_layer",layerOptions:{filter:["has","point_count"]},paint:U},a.features.map(function(t,n){return r.a.createElement(z.b,{key:n,coordinates:t.geometry.coordinates,onClick:e.markerClick.bind(e,t)})}))),r.a.createElement(j.a,{path:"/message",render:function(){return r.a.createElement(L,{addMessage:e.addMessage})}}),a.features.length>0&&r.a.createElement("div",null,r.a.createElement(j.a,{path:"/view-message/:id",render:function(t){var n=parseInt(t.match.params.id),i=e.getFeature(a,n);return r.a.createElement(N,{likeMessage:e.likeMessage,liked:i.properties.liked,session:o,message_id:n,text:i.properties.text,country:i.properties.country,city:i.properties.city})}}),r.a.createElement(j.a,{path:"/images/:id",render:function(t){var n=parseInt(t.match.params.id),i=e.getFeature(a,n);return r.a.createElement(_,{city:i.properties.city,session:o,message_id:n})}})))}}]),t}(a.Component),Z=Object(j.e)(Q),Y=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleSubmit=function(e){var t={email:n.state.email,password:n.state.password};e.preventDefault();fetch("http://0.0.0.0:5000/spirit/api/v1.0/register",{credentials:"include",method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json().then(function(t){e.ok?(n.props.onLogin(),n.props.history.push("/")):n.setState({error:!0,errorMessage:t.error})})}).catch(function(e){alert("Error:",e)})},n.handleChange=function(e){"email"===e.target.name&&n.setState({email:e.target.value}),"password"===e.target.name&&n.setState({password:e.target.value})},n.state={email:"",password:"",error:!1,errorMessage:void 0},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,n=e.password,a=e.errorMessage;return r.a.createElement(O,{error:a,formName:"Register",id:"register-modal"},r.a.createElement("div",{className:"register"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("label",null,"Email"),r.a.createElement("input",{name:"email",type:"email",value:t,onChange:this.handleChange}),r.a.createElement("label",null,"Password"),r.a.createElement("input",{name:"password",type:"password",value:n,onChange:this.handleChange}),r.a.createElement("input",{className:"btn",type:"submit",value:"Submit"}))))}}]),t}(a.Component),G=Object(j.e)(Y),V=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault();fetch("http://0.0.0.0:5000/spirit/api/v1.0/login",{credentials:"include",method:"POST",body:JSON.stringify(n.state),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json().then(function(t){e.ok?(n.props.onLogin(),n.props.history.push("/")):n.setState({error:!0,errorMessage:t.error})})}).catch(function(e){console.error("Error:",e),alert(e)})},n.handleChange=function(e){"email"===e.target.name&&n.setState({email:e.target.value}),"password"===e.target.name&&n.setState({password:e.target.value})},n.state={email:"",password:"",error:!1,errorMessage:void 0},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,n=e.password,a=e.errorMessage;return r.a.createElement(O,{error:a,formName:"Login",id:"login-modal"},r.a.createElement("div",{className:"login"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("label",null,"Email"),r.a.createElement("input",{name:"email",type:"email",value:t,onChange:this.handleChange}),r.a.createElement("label",null,"Password"),r.a.createElement("input",{name:"password",type:"password",value:n,onChange:this.handleChange}),r.a.createElement("input",{className:"btn",type:"submit",value:"Submit"}))))}}]),t}(a.Component),$=Object(j.e)(V),K=n(93),X=(n(152),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).fetchData=function(e){var t=n.props.session.id;if(t){var a="http://0.0.0.0:5000/spirit/api/v1.0/message/".concat(t,"/like?page=").concat(n.state.page);fetch(a,{credentials:"include"}).then(function(e){return e.json().then(function(t){e.ok&&n.setState(function(e){return{page:e.page+1,setIsFetching:!0,hasNext:t[1],allLikedFeatures:e.allLikedFeatures.concat(t[0])}})})}).catch(function(e){return console.error("Error:",e)})}},n.handleScroll=function(e){var t=n.state,a=t.isFetching,r=t.hasNext,o=e.target;o.scrollHeight-o.scrollTop===o.clientHeight&&!a&&r&&n.fetchData()},n.state={isFetching:!1,setIsFetching:!1,page:1,allLikedFeatures:[],hasNext:!0},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.session.id!==e.session.id&&this.fetchData()}},{key:"componentDidMount",value:function(){if(!this.props.session)return null;this.fetchData()}},{key:"render",value:function(){if(!this.props.session)return null;var e=this.state.allLikedFeatures;return r.a.createElement(O,{scroll:this.handleScroll,formName:"Liked Messages",id:"liked-message-modal"},e.length>0&&r.a.createElement("ul",{id:"liked-message-list"},r.a.createElement(K.a,{style:{height:"100px"}},e.map(function(e,t){return r.a.createElement("div",{key:t,id:"liked-feature-btn"},r.a.createElement(s.b,{to:"view-message/"+e.properties.id},e.properties.text))}))),r.a.createElement("div",null,e.length>0||r.a.createElement("h3",{className:"solid-like"},"Add Some Likes ",r.a.createElement(S.a,{icon:C.a}))))}}]),t}(a.Component)),ee=Object(j.e)(X),te=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleLogout=function(e){e.preventDefault();fetch("http://0.0.0.0:5000/spirit/api/v1.0/logout",{credentials:"include",method:"POST",body:JSON.stringify(n.state),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json().then(function(t){e.ok?(n.props.onlogOut(),n.props.history.push("/")):n.setState({error:!0,errorMessage:t.error})})}).catch(function(e){console.error("Error:",e)})},n.state={error:""},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.onLogin,n=e.session,a=n.logged_in;return r.a.createElement("div",null,r.a.createElement("header",{id:"nav",className:"navbar navbar-expand navbar-dark flex-md-row bd-navbar"},r.a.createElement("div",null,a&&r.a.createElement("ul",{className:"navbar-nav bd-navbar-nav flex-row"},r.a.createElement("li",{id:"new-message",className:"nav-item"},r.a.createElement(s.b,{to:"/message"},"New",r.a.createElement(S.a,{icon:C.b}))),r.a.createElement("li",{id:"all-likes",className:"nav-item solid-like"},r.a.createElement(s.b,{to:"/likes"},"Likes",r.a.createElement(S.a,{icon:C.a}))))),r.a.createElement("ul",{className:"navbar-nav flex-row",id:"logoutUl"},a||r.a.createElement("div",{className:"nav-item login-btns"},r.a.createElement("li",{id:"login"},r.a.createElement(s.b,{to:"/login"},"Login")),r.a.createElement("li",{id:"register"},r.a.createElement(s.b,{to:"/register"},"Register"))),a&&r.a.createElement("li",{id:"logout",className:"nav-item"},r.a.createElement(s.b,{to:"/logout",onClick:this.handleLogout},"Logout",r.a.createElement(S.a,{icon:C.c}))))),r.a.createElement(j.a,{path:"/likes",render:function(){return r.a.createElement(ee,{session:n})}}),r.a.createElement(j.a,{path:"/register",render:function(){return r.a.createElement(G,{onLogin:t})}}),r.a.createElement(j.a,{path:"/logout"}),r.a.createElement(j.a,{path:"/login",render:function(){return r.a.createElement($,{onLogin:t})}}))}}]),t}(a.Component),ne=Object(j.e)(te),ae=function(){return fetch("http://0.0.0.0:5000/spirit/api/v1.0/me",{credentials:"include"}).then(function(e){return e.json()}).then(function(e){return e})},re=(n(153),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).getSession=function(){ae().then(function(e){n.setState({session:e})})},n.state={session:{}},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getSession()}},{key:"render",value:function(){var e=this,t=this.state.session.logged_in;return r.a.createElement("div",{id:"main"},r.a.createElement(g,null),r.a.createElement(ne,{session:this.state.session,onLogin:function(){return e.getSession()},onlogOut:function(){return e.getSession()}}),r.a.createElement(Z,{session:this.state.session,loggedIn:t}))}}]),t}(a.Component)),oe=Object(j.e)(re);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(s.a,null,r.a.createElement(oe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},39:function(e,t,n){e.exports=n.p+"static/media/Stars_Timelapse_from_Beach_1Videvo.d83cfef1.mov"},84:function(e,t,n){e.exports=n.p+"static/media/earth-animated.5b52cac9.gif"},94:function(e,t,n){e.exports=n(154)},99:function(e,t,n){}},[[94,1,2]]]);
//# sourceMappingURL=main.01d3248c.chunk.js.map