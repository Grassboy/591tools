window.addEventListener('load', function(){
  var win = window,
      jQuery = win.jQuery,
      $ = jQuery;
  var obj_number = localStorage["obj_number"] || 0;
  localStorage["obj_number"] = obj_number;
  $([
    '<br /><div class="clear"></div><h3>搜尋最新物件</h3>',
    '<div class="newestFilter" style="margin: 5px 7%  0 7%;">',
      '只顯示房屋物件編號為 # 之後的所有物件<br /><input type="text" id="newObjNumber" style="width:100%;" placeholder="請輸入物件編號(ex: 2087906)" />',
    '</div>'
  ].join('')).insertAfter('.houseSearch');
  $('#newObjNumber').change(function(){
    var newest_obj_no = $('#newObjNumber').val();
    newest_obj_no = newest_obj_no || 0;
    newest_obj_no = parseInt(newest_obj_no, 10);
    if(newest_obj_no) localStorage["obj_number"] = newest_obj_no;
  });
  if(obj_number) {
    $('#newObjNumber').val(obj_number);
  }
  win.Map_Opt.addWare = function(data){
		var self = this;
    var newest_obj_no = $('#newObjNumber').val();
    newest_obj_no = newest_obj_no || 0;
    newest_obj_no = parseInt(newest_obj_no, 10);
    var x = 0,y = 0;
    for(i in data){
      x++;
      if(parseInt(data[i][5], 10) < newest_obj_no){
        y++
			  delete data[i];
      }
    }
    //if(y) alert([x, '個物件中，刪了', y, '個'].join(''));

		for (i in data){
			// 添加物件標記
      latLng = new google.maps.LatLng(data[i][2], data[i][3]);
      data[i]['c_id'] = i;
      data[i]['type'] = self.DEF_TRACETYPE;
      var overlay = new MarkerShow(self.map, latLng, data[i]);
      self.overlays.push(overlay);
      // 刪除已添加，遞歸
      delete data[i];
      self.auto_add_ware = window.setTimeout(function(){Map_Opt.addWare(data);}, 60);
      return;
		}
	};
});
