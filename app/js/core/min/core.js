/*! apiserver 07-07-2016 */
function MetaTagService(){var a={description:'Pluma Blog - Vincenzo "rEDSAMK" Greco - MEAN stack, developer, blog',keywords:"MEAN stack developer code blog pluma Pluma Blog Project angularJS node.js express mongodb opensource open source Vincenzo Greco rEDSAMK"};return a}function getRandom(a){return Math.floor(100*Math.random())}function AuthService(a,b,c,d){return{signIn:function(b,c){return a.post("/api/authenticate",{username:b,password:c})},register:function(a){return c.upload({url:"/api/register",data:a})},getUserProfile:function(b){return a.get("/api/profile/self")},updateUserProfile:function(b){return a.put("/api/profile/self",b)},getUsernameProfile:function(b){return a.get("/api/profile/public/"+b)},getAllUsers:function(){return a.get("/api/profile/")},updateProfiles:function(b,c){return a.put("/api/profile/admin/"+b,c)},deleteProfiles:function(b,c){return a["delete"]("/api/profile/admin/"+b)},getAllPost:function(){return a.get("/api/post")},getAllPublicPost:function(){return a.get("/api/post/public")},getPost:function(b){return a.get("/api/post/"+b)},getPublicPost:function(b){return a.get("/api/post/public/"+b)},savePost:function(a,b){return c.upload({url:"/api/post",data:a})},updatePost:function(b,c){return a.put("/api/post/"+b,c)},deletePost:function(b,c){return a["delete"]("/api/post/"+b)},getSettings:function(){return a.get("/api/settings")},updateSettings:function(b){return a.put("/api/settings",b)},refreshSettingsFromDB:function(){return this.getSettings().success(function(a){d.blogSettings=a.settings})}}}function MessageService(a){function b(b){a.message={text:b,type:"success",show:!0}}function c(b){a.message={text:b,type:"danger",show:!0}}var d={};return d.success=b,d.error=c,a.$on("$stateChangeStart",function(b,c,d,e,f){delete a.message}),d}function SettingsService(a){var b={pageTitle:"AngularJS Home",banner:"../desk.jpg",bannerDefault:"../desk.jpg",blogSettings:{navBrand:"",signupEnabled:!0},authenticated:function(b){a.authenticated=b},isAuthenticated:function(){return a.authenticated},currentUser:{}};return b}myApp=angular.module("testApp",["ui.router","ngSanitize","ui.tinymce","ngFileUpload","ui.bootstrap"]),myApp.run(["$window","SettingsService","AuthService","UtilityService","$state","MessageService",function(a,b,c,d,e,f){if(a.localStorage.token){b.authenticated(!0);var g=d.tokenData().user;c.getUserProfile(g).success(function(a){b.currentUser=a}).error(function(a,b){console.log(b+": "+a),e.go("login"),f.error("User not logged in! "+a)})}else b.authenticated(!1);c.refreshSettingsFromDB()}]),myApp.controller("ProfileController",["$scope","SettingsService","userData","AuthService","$state","MessageService","UtilityService",function(a,b,c,d,e,f,g){b.currentUser=c.data,a.user=angular.copy(b.currentUser),a.role=a.user.role.split("_")[1],a.saveUserEdit=function(){var b={name:a.user.name,email:a.user.email,github:a.user.github,facebook:a.user.facebook,twitter:a.user.twitter,description:a.user.description},c=!0;console.log(!g.isEmpty(a.oldPassword)&&!g.isEmpty(a.newPasswordA)&&!g.isEmpty(a.newPasswordB)),g.isEmpty(a.oldPassword)&&g.isEmpty(a.newPasswordA)&&g.isEmpty(a.newPasswordB)||(g.isEmpty(a.oldPassword)||g.isEmpty(a.newPasswordA)||g.isEmpty(a.newPasswordB)?(f.error("Password fields empty"),c=!1):a.newPasswordA===a.newPasswordB?(b.oldpassword=a.oldPassword,b.newpassword=a.newPasswordA,c=!0):(f.error("Password fields are not equal"),c=!1)),c&&d.updateUserProfile(b).success(function(a){e.go(e.current,{},{reload:!0}),f.success("User data updated!")}).error(function(a,b){f.error("Error in update user data: "+a)})}}]),myApp.controller("ProfileUserController",["MessageService","$state","AuthService","$stateParams","$scope","SettingsService",function(a,b,c,d,e,f){console.log(d.username),c.getUsernameProfile(d.username).success(function(a){e.user=a,f.pageTItle="Profile: "+e.user.name}).error(function(c,d){b.go("home"),a.error(c)})}]),myApp.controller("PostController",["$timeout","postData","MessageService","$state","AuthService","$stateParams","$scope","SettingsService",function(a,b,c,d,e,f,g,h){g.post=b.data,h.pageTitle=g.post.title,h.banner="../upload/"+g.post.banner,a(function(){Prism.highlightAll(!1)},0)}]),myApp.controller("SettingsController",["$scope","SettingsService","MetaTagService",function(a,b,c){a.settings=b,a.metatag=c}]),myApp.controller("TabTestController",["$scope",function(a){a.data=[{id:0,val:getRandom(100),key:"test"},{id:1,val:getRandom(100),key:"test"},{id:2,val:getRandom(100),key:"test"},{id:3,val:getRandom(100),key:"test"}]}]),myApp.controller("indexController",["$scope","AuthService","$stateParams","MessageService","filterFilter",function(a,b,c,d,e){a.setPage=function(b){a.currentPage=b},a.posts=[],console.log(c),a.$watch("tagSearch",function(b,c){a.filtered=e(a.posts,b),a.totalItems=a.filtered.length,a.currentPage=1,a.currentlySelected=-1},!0),b.getAllPublicPost().success(function(b){a.posts=b,a.tagSearch={tag:{name:c.tag}},a.viewby=6,a.totalItems=a.posts.length,a.currentPage=1,a.itemsPerPage=a.viewby,a.maxSize=5}).error(function(a,b){d.error(a)})}]),myApp.controller("RegisterController",["$scope","UtilityService","MessageService","AuthService","$state",function(a,b,c,d,e){a.register=function(){if(b.isEmpty(a.username)||b.isEmpty(a.password)||b.isEmpty(a.email)||b.isEmpty(a.displayname))c.error("Empty fields!");else{var f={name:a.displayname,username:a.username,password:a.password,email:a.email,github:a.github,facebook:a.facebook,twitter:a.twitter,description:a.description,file:a.avatarFile};d.register(f).success(function(a){e.go("login"),c.success("User "+f.username+" registrated! Please Log in")}).error(function(a,b){c.error("Error "+b+": "+a)})}}}]),myApp.controller("LogoutController",["$window","SettingsService","MessageService","$state",function(a,b,c,d){(a.sessionStorage.token||b.isAuthenticated())&&(delete a.localStorage.token,b.authenticated(!1),b.currentUser=null,d.go("home"),c.success("Succesfully logged out"))}]),myApp.controller("AboutController",["$scope","SettingsService",function(a,b){a.about=b.blogSettings.about,a.tinymceOptions={plugins:"link image code visualblocks",br_in_pre:!0,toolbar:"undo redo | bold italic | alignleft aligncenter alignright | code | visualblocks"}}]),myApp.factory("MetaTagService",MetaTagService),myApp.controller("LoginController",["$scope","MessageService","AuthService","SettingsService","$state","$window",function(a,b,c,d,e,f){a.signIn=function(){null==a.username||""===a.username||null==a.password||""===a.password?b.error("Empty"):c.signIn(a.username,a.password).success(function(g){d.authenticated(!0),f.localStorage.token=g.token,c.getUserProfile(a.username).success(function(a){d.currentUser=a}).error(function(a,b){console.log(b+": "+a)}),e.go("home"),b.success("Logged in!")}).error(function(a,c){b.error("Error in login: "+a.status)})}}]),myApp.controller("AdminController",["$scope","UtilityService","$state","SettingsService","MessageService","AuthService",function(a,b,c,d,e,f){a.$state=c,a.blogSettings=angular.copy(d.blogSettings),a.saveSettings=function(){({signupEnabled:a.blogSettings.signupEnabled,navBrand:a.blogSettings.navBrand,about:a.blogSettings.about});f.updateSettings(a.blogSettings).success(function(a){e.success("Settings updated!"),d.blogSettings=a.settings}).error(function(a,b){e.error("Error in updating the settings: "+a.data)})}}]),myApp.controller("AdminNewPostController",["$scope","UtilityService","AuthService","MessageService","Upload",function(a,b,c,d,e){a.tinymceModel="Write here your post!",c.getAllPost().success(function(b){a.posts=b}).error(function(a,b){d.error(a)}),a.status="published",a.savePost=function(){console.log(a.bannerFile);var b={title:a.title,tags:a.tags,content:a.tinymceModel,status:a.status,file:a.bannerFile};c.savePost(b,a.bannerFile).success(function(a){d.success("Post: "+a.post.title+" succesfully added!")}).error(function(a,b){d.error(a)})},a.tinymceOptions={plugins:"link image code visualblocks",br_in_pre:!0,toolbar:"undo redo | bold italic | alignleft aligncenter alignright | code | visualblocks"}}]),myApp.controller("AdminEditPostController",["filterFilter","$scope","UtilityService","AuthService","MessageService","$state","$timeout",function(a,b,c,d,e,f,g){b.setPage=function(a){b.currentPage=a},b.posts=[],b.filterStatusFunction=function(){b.postSearch.status=b.filterStatus,console.log(b.postSearch)},b.$watch("postSearch",function(c,d){b.filtered=a(b.posts,c),b.totalItems=b.filtered.length,b.currentPage=1,b.currentlySelected=-1},!0),d.getAllPost().success(function(a){b.posts=a,b.postSearch={status:""},b.viewby=6,b.totalItems=b.posts.length,b.currentPage=1,b.itemsPerPage=b.viewby,b.maxSize=5}).error(function(a,b){e.error(a)}),b.deletePost=function(){var a=b.postFiltered[b.currentlySelected]._id;d.deletePost(a).success(function(a){f.go(f.current,{},{reload:!0}),e.success(a.status)}).error(function(a,b){e.error(a)}),s},b.updatePost=function(){var a={title:b.title,tags:b.tags,content:b.content,status:b.status},c=b.postFiltered[b.currentlySelected]._id;d.updatePost(c,a).success(function(a){f.go(f.current,{},{reload:!0}),e.success(a.status)}).error(function(a,b){e.error(a)})},b.currentlySelected=-1,b.select=function(a){b.currentlySelected==a?b.currentlySelected=-1:(b.currentlySelected=a,angular.forEach(_.omit(b.postFiltered[a],["date","__v","_id","$$hashKey"]),function(c,d){if(console.log(d),"tag"===d){b.tags="";var e=Array();b.postFiltered[a].tag.forEach(function(a){e.push(a.name)}),b.tags=e.join(",")}else b[d]=b.postFiltered[a][d]}),b.updatePrism())},b.updatePrism=function(){g(function(){Prism.highlightAll(!1)},0)},b.content="Write here your post!",b.tinymceOptions={plugins:"link image code visualblocks",br_in_pre:!0,toolbar:"undo redo | bold italic | alignleft aligncenter alignright | code | visualblocks"}}]),myApp.controller("AdminUsersController",["filterFilter","$scope","UtilityService","AuthService","MessageService","$state","$timeout",function(a,b,c,d,e,f,g){b.users=[],d.getAllUsers().success(function(a){b.users=a,b.userSearch={username:"",role:""},b.viewby=6,b.totalItems=b.users.length,b.currentPage=1,b.itemsPerPage=b.viewby,b.maxSize=5}),b.$watch("userSearch",function(c,d){b.filtered=a(b.users,c),b.totalItems=b.filtered.length,b.currentPage=1,b.currentlySelected=-1},!0),b.currentlySelected=-1,b.select=function(a){b.currentlySelected==a?b.currentlySelected=-1:(b.currentlySelected=a,angular.forEach(_.omit(b.userFiltered[a],["__v","_id","$$hashKey"]),function(c,d){console.log(d),b[d]=b.userFiltered[a][d]}))},b.deleteUser=function(){var a=b.userFiltered[b.currentlySelected].username;d.deleteProfiles(a).success(function(a){f.go(f.current,{},{reload:!0}),e.success(a.status)}).error(function(a,b){e.error(a)})},b.saveUser=function(){var a={role:b.role},c=b.userFiltered[b.currentlySelected].username;d.updateProfiles(c,a).success(function(a){f.go(f.current,{},{reload:!0}),e.success(a.status)}).error(function(a,b){e.error(a)})}}]),myApp.run(["$rootScope","SettingsService","$state","MessageService","$templateCache","$window","$location",function(a,b,c,d,e,f,g){f.ga("create","UA-80202800-2","auto"),a.$on("$stateChangeSuccess",function(a,c,d,e,h){b.pageTitle=c.data.title,b.banner=b.bannerDefault,f.ga("send","pageview",g.path())}),a.$on("$stateChangeStart",function(a,f,g,h,i){f.data.requireAuthentication&&!b.isAuthenticated()&&(a.preventDefault(),c.go("login"),d.error("Auth user required")),"/api/test/"===f.templateUrl&&e.remove(f.templateUrl)})}]),myApp.config(["$httpProvider",function(a){a.interceptors.push("TokenInterceptor")}]),myApp.factory("UtilityService",["$window",function(a){return{isEmpty:function(a){return null==a||""==a},tokenData:function(){var b=a.localStorage.token;return JSON.parse(a.atob(b.split(".")[1]))}}}]),myApp.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){c.html5Mode({enabled:!0,requireBase:!1}),a.state("home",{url:"/",templateUrl:"route/index.html",controller:"indexController",data:{title:"Home",requireAuthentication:!1}}).state("hometag",{url:"/tag/{tag}",templateUrl:"route/index.html",controller:"indexController",data:{title:"Home tags",requireAuthentication:!1}}).state("tab",{url:"/tab",templateUrl:"route/tab.html",controller:"TabTestController",data:{title:"Tab",requireAuthentication:!0}}).state("login",{url:"/login",templateUrl:"route/login.html",controller:"LoginController",data:{title:"Login",requireAuthentication:!1}}).state("register",{url:"/register",templateUrl:"route/register.html",controller:"RegisterController",data:{title:"Register",requireAuthentication:!1}}).state("logout",{url:"/logout",controller:"LogoutController",data:{title:"Logout",requireAuthentication:!0}}).state("profile",{url:"/profile",templateUrl:"route/profile.html",controller:"ProfileController",resolve:{userData:["SettingsService","UtilityService","$window","AuthService","$state","MessageService",function(a,b,c,d,e,f){if(c.localStorage.token){var g=b.tokenData().user;return d.getUserProfile(g).error(function(a,b){console.log(b+": "+a),e.go("login"),f.error("User not logged in! "+a)})}}]},data:{title:"Profile",requireAuthentication:!0}}).state("profileUser",{url:"/profile/{username}",templateUrl:"route/profile.user.html",controller:"ProfileUserController",data:{title:"Profile",requireAuthentication:!1}}).state("post",{url:"/post/{id}",templateUrl:"route/post.html",controller:"PostController",resolve:{postData:["AuthService","$stateParams","$q","MessageService","$state",function(a,b,c,d,e){return a.getPublicPost(b.id).error(function(a,b){e.go("home"),d.error("Error on retriving the post! "+a)})}],metatag:["postData","MetaTagService",function(a,b){a.data.tag.forEach(function(a){b.keywords+=a.name+" "})}]},data:{title:"Post",requireAuthentication:!1}}).state("admin",{url:"/admin",templateUrl:"/api/admin/",controller:"AdminController",resolve:{refreshSettings:["AuthService",function(a){return a.refreshSettingsFromDB()}]},data:{title:"Admin",requireAuthentication:!0}}).state("admin.adminNewPost",{url:"/newPost",views:{"adminapp@admin":{templateUrl:"/api/admin/newPost",controller:"AdminNewPostController"}},data:{title:"Admin: New post",requireAuthentication:!0}}).state("admin.adminEditPost",{url:"/editPost",views:{"adminapp@admin":{templateUrl:"/api/admin/editPost",controller:"AdminEditPostController"}},data:{title:"Admin: Manage posts",requireAuthentication:!0}}).state("admin.adminUsers",{url:"/users",views:{"adminapp@admin":{templateUrl:"/api/admin/users",controller:"AdminUsersController"}},data:{title:"Admin: Users",requireAuthentication:!0}}).state("about",{url:"/about",controller:"AboutController",templateUrl:"route/about.html",resolve:{refreshSettings:["AuthService",function(a){return a.refreshSettingsFromDB()}]},data:{title:"About",requireAuthentication:!1}}).state("notfound",{url:"/404",controller:"NotfoundController",templateUrl:"route/404.html",data:{title:"404: Page not found",requireAuthentication:!1}}),b.otherwise("/404")}]),AuthService.$inject=["$http","$rootScope","Upload","SettingsService"],angular.module("testApp").factory("AuthService",AuthService),MessageService.$inject=["$rootScope"],angular.module("testApp").factory("MessageService",MessageService),SettingsService.$inject=["$rootScope"],angular.module("testApp").factory("SettingsService",SettingsService),angular.module("testApp").factory("TokenInterceptor",["$q","$window","$location","$injector","SettingsService","MessageService",function(a,b,c,d,e,f){return{request:function(a){return a.headers=a.headers||{},b.localStorage.token&&(a.headers.Authorization="Bearer "+b.localStorage.token),a},requestError:function(b){return a.reject(b)},responseError:function(c){return null!=c&&401===c.status&&(console.log("401"),delete b.localStorage.token,e.authenticated(!1),e.currentUser={},f.error("Not authenticated, you must Log In"),d.get("$state").transitionTo("login")),null!=c&&403===c.status&&(console.log("403"),d.get("$state").transitionTo("home"),f.error(c.data.status)),a.reject(c)}}}]);