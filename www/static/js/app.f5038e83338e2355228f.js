webpackJsonp([1],{"Abo/":function(e,t){},Cl5Y:function(e,t){},JraU:function(e,t){e.exports=[{realValue:"jiuzhou",value:"九州"},{realValue:"toutiao",value:"头条神器"}]},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("7+uW"),r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var s=n("VU/8")({name:"app"},r,!1,function(e){n("Abo/")},null,null).exports,o=n("/ocq"),i={name:"selector",props:{data:Array,prepend:String,tip:String},data:function(){return{name:"",value:""}},methods:{querySearch:function(e,t){t(this.data)},handleSelect:function(e){this.value=e.realValue,this.checkSelect()&&this.$emit("selectItem",this.value)},handleBlur:function(){this.checkSelect()||(this.name="",this.value="",this.$emit("selectItem",""))},checkSelect:function(){var e=this;return this.data.filter(function(t){return t.value===e.name}).length>0}}},c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{"margin-top":"15px"}},[n("el-autocomplete",{staticClass:"inline-input",staticStyle:{display:"block"},attrs:{"fetch-suggestions":e.querySearch,placeholder:"单击选择"+e.tip,clearable:""},on:{select:e.handleSelect,blur:e.handleBlur,debounce:function(e){}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}},[n("template",{slot:"prepend"},[e._v(e._s(e.prepend)+"：")])],2)],1)},staticRenderFns:[]};var l=n("VU/8")(i,c,!1,function(e){n("Cl5Y")},"data-v-d7112c68",null).exports,u=n("JraU"),p=n.n(u),h=n("hF/Y"),m=n.n(h),f={name:"admin",components:{AdminSelect:l},data:function(){return{oprator:"",username:"",project:"",time:"",projectData:[],timeData:[]}},methods:{handleProjectSelected:function(e){this.project=e},handleTimeSelected:function(e){this.time=e},checkOprator:function(){return this.oprator||(this.showErr("请填写授权人"),!1)},checkUsername:function(){return this.username||(this.showErr("请填写用户名"),!1)},checkProjet:function(){return this.project||(this.showErr("请选择项目"),!1)},checkTime:function(){return this.time||(this.showErr("请选择授权时间"),!1)},checkParamsComplete:function(e){switch(e){case"update":return this.checkOprator()&&this.checkUsername()&&this.checkProjet()&&this.checkTime();case"query":case"delete":return this.checkOprator()&&this.checkUsername()&&this.checkProjet();default:return!1}},updateUser:function(){var e=this;this.checkParamsComplete("update")&&this.$axios.post("/admin/"+this.project,{action:"update",admin:this.oprator,username:this.username,time:this.time}).then(function(e){return e.data}).then(function(t){0===t.errno?e.showSuccess("操作成功"):e.showErr(t.errmsg)},function(t){e.showErr(t.message)})},queryUser:function(){var e=this;this.checkParamsComplete("query")&&this.$axios.post("/admin/"+this.project,{action:"query",admin:this.oprator,username:this.username}).then(function(e){return e.data}).then(function(t){0===t.errno?e.showSuccess("操作成功。到期时间："+new Date(parseInt(t.data.time)).toLocaleString()):e.showErr(t.errmsg)},function(t){e.showErr(t.message)})},deleteUser:function(){var e=this;this.checkParamsComplete("delete")&&this.$confirm("此操作将永久删除用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){e.$axios.post("/admin/"+e.project,{action:"delete",admin:e.oprator,username:e.username}).then(function(e){return e.data}).then(function(t){0===t.errno?e.showSuccess("操作成功"):e.showErr(t.errmsg)},function(t){e.showErr(t.message)})}).catch(function(){e.showErr("取消操作")})},showErr:function(e){this.$message({type:"error",message:"操作失败: "+e})},showSuccess:function(e){this.$message({type:"success",message:e})}},mounted:function(){this.projectData=p.a,this.timeData=m.a}},d={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-header",[n("el-row",[n("el-col",{attrs:{span:24,sm:{span:10,offset:7},md:{span:8,offset:8},lg:{span:6,offset:9}}},[n("div",{staticClass:"header-title"},[n("i",{staticClass:"el-icon-upload"}),e._v("项目授权管理")])])],1)],1),e._v(" "),n("el-main",[n("el-row",[n("el-col",{attrs:{span:24,sm:{span:10,offset:7},md:{span:8,offset:8},lg:{span:6,offset:9}}},[n("div",[n("el-input",{attrs:{placeholder:"请输入授权人",clearable:""},model:{value:e.oprator,callback:function(t){e.oprator=t},expression:"oprator"}},[n("template",{slot:"prepend"},[e._v("授权人：")])],2)],1)])],1),e._v(" "),n("el-row",[n("el-col",{attrs:{span:24,sm:{span:10,offset:7},md:{span:8,offset:8},lg:{span:6,offset:9}}},[n("div",{staticStyle:{"margin-top":"15px"}},[n("el-input",{attrs:{placeholder:"请输入用户名",clearable:""},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}},[n("template",{slot:"prepend"},[e._v("用户名：")])],2)],1)])],1),e._v(" "),n("el-row",[n("el-col",{attrs:{span:24,sm:{span:10,offset:7},md:{span:8,offset:8},lg:{span:6,offset:9}}},[n("admin-select",{attrs:{data:e.projectData,prepend:"项目名称",tip:"项目"},on:{selectItem:e.handleProjectSelected}})],1)],1),e._v(" "),n("el-row",[n("el-col",{attrs:{span:24,sm:{span:10,offset:7},md:{span:8,offset:8},lg:{span:6,offset:9}}},[n("admin-select",{attrs:{data:e.timeData,prepend:"授权时间",tip:"时间"},on:{selectItem:e.handleTimeSelected}})],1)],1)],1),e._v(" "),n("el-footer",[n("el-row",[n("el-col",{attrs:{span:24,sm:{span:10,offset:7},md:{span:8,offset:8},lg:{span:8,offset:8}}},[n("div",{staticStyle:{"margin-top":"40px"}},[n("el-button-group",[n("el-button",{attrs:{type:"primary",plain:""},on:{click:e.updateUser}},[e._v("增加时间")]),e._v(" "),n("el-button",{attrs:{type:"primary",plain:""},on:{click:e.queryUser}},[e._v("查询用户")]),e._v(" "),n("el-button",{attrs:{type:"danger",plain:""},on:{click:e.deleteUser}},[e._v("删除用户")])],1)],1)])],1)],1)],1)},staticRenderFns:[]};var v=n("VU/8")(f,d,!1,function(e){n("ln2/")},null,null).exports;a.default.use(o.a);var g=new o.a({routes:[{path:"/",redirect:"/admin"},{path:"/admin",component:v}]}),w=n("zL8q"),k=n.n(w),y=(n("tvR6"),n("mtWM")),S=n.n(y);a.default.config.productionTip=!1,a.default.use(k.a,{size:"small"}),a.default.prototype.$axios=S.a,new a.default({el:"#app",router:g,template:"<App/>",components:{App:s}})},"hF/Y":function(e,t){e.exports=[{realValue:"86400000",value:"1天"},{realValue:"604800000",value:"7天"},{realValue:"2592000000",value:"1月"},{realValue:"31536000000",value:"1年"}]},"ln2/":function(e,t){},tvR6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.f5038e83338e2355228f.js.map