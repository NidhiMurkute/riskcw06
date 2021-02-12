sap.ui.define(["sap/ui/core/util/MockServer","sap/ui/model/json/JSONModel","sap/base/util/UriParameters","sap/base/Log"],function(e,t,r,a){"use strict";var i,o="ns/mitigations/",n=o+"localService/mockdata";var s={init:function(s){var u=s||{};return new Promise(function(s,c){var p=sap.ui.require.toUrl(o+"manifest.json"),f=new t(p);f.attachRequestCompleted(function(){var t=new r(window.location.href),c=sap.ui.require.toUrl(n),p=f.getProperty("/sap.app/dataSources/mainService"),l=sap.ui.require.toUrl(o+p.settings.localUri),d=/.*\/$/.test(p.uri)?p.uri:p.uri+"/";d=d&&new URI(d).absoluteTo(sap.ui.require.toUrl(o)).toString();if(!i){i=new e({rootUri:d})}else{i.stop()}e.config({autoRespond:true,autoRespondAfter:u.delay||t.get("serverDelay")||500});i.simulate(l,{sMockdataBaseUrl:c,bGenerateMissingMockData:true});var m=i.getRequests();var g=function(e,t,r){r.response=function(r){r.respond(e,{"Content-Type":"text/plain;charset=utf-8"},t)}};if(u.metadataError||t.get("metadataError")){m.forEach(function(e){if(e.path.toString().indexOf("$metadata")>-1){g(500,"metadata Error",e)}})}var v=u.errorType||t.get("errorType"),h=v==="badRequest"?400:500;if(v){m.forEach(function(e){g(h,v,e)})}i.setRequests(m);i.start();a.info("Running the app with mock data");s()});f.attachRequestFailed(function(){var e="Failed to load application manifest";a.error(e);c(new Error(e))})})},getMockServer:function(){return i}};return s});