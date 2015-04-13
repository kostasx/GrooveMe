javascript:(function()%7Bfunction%20callback()%7B(function(%24)%7Bvar%20jQuery%3D%24%3B!function(n)%7Bfunction%20o(o)%7Bif(%22undefined%22!%3Dtypeof%20Grooveshark)%7Bo%3Dprompt(%22Paste%20the%20Song%20List%20in%20here%3A%22)%2Co%3Dr(o)%3Bvar%20t%3D%5B%5D%3Bo.forEach(function(o)%7Bvar%20r%3D%22http%3A%2F%2Ftinysong.com%2Fb%2F%22%2BencodeURI(o)%2B%22%3Fformat%3Djson%26key%3D%22%2Bp%3Bconsole.log(%22Pushing%20Song%3A%20%22%2Cr%2C%22%5Cn%22)%2Ct.push(n.get(r))%7D)%2Cn.when.apply(null%2Ct).then(function()%7Bvar%20n%3D%5B%5D%2Ct%3D%5B%5D%2Cr%3D%5B%5D%2Ce%3D%5B%5D.slice.apply(arguments)%3Breturn%20console.log(%22ajaxCallsReturned%22%2Ce)%2Ce.forEach(function(o)%7Bvar%20e%3DJSON.parse(o%5B0%5D)%2Ca%3De.SongID%3Bvoid%200!%3D%3Da%3F(n.push(a)%2Ct.push(e.ArtistName%2B%22%20-%20%22%2Be.SongName))%3Ar.push(a)%7D)%2Cwindow.Grooveshark.addSongsByID(n)%2Cconsole.log(%22%23%22%2Bo.length%2B%22%20inputted.%5Cn%23%22%2Bn.length%2B%22%20songs%20found%20and%20imported.%5Cn%23%22%2Br.length%2B%22%20songs%20were%20not%20found%2Fimported.%22)%2Cconsole.log(%22Songs%20Imported%3A%5Cn%22%2Ct)%2C!0%7D%2Cfunction()%7Bconsole.log(%22Error...%22)%7D)%7D%7Dfunction%20t()%7Bvar%20o%3Dprompt(%22Enter%20the%20jQuery%20selector%20with%20the%20song%20list%3A%22)%2Ct%3D%5B%5D%2Cr%3D%22%22%2Ca%3Dn(o).length%3Breturn%20n(o).each(function(a%2Ci)%7Bvar%20s%3Dn(i).text()%3Bs%3De(s)%2Ct.push(s)%2Cr%2B%3Ds%2Ca%3Cn(o).length-1%26%26(r%2B%3D%22%5Cr%5Cn%22)%7D)%2Cprompt(%22%23%22%2Ba%2B%22%20songs%20found.%20Copy%20to%20clipboard%3A%20Ctrl%2BC%2C%20Enter%22%2Cr)%2Cr%7Dfunction%20r(n)%7Breturn%20n%3Dn.replace(%2F%5Cr%3F%5Cn%7C%5Cr%2Fg%2C%22%2C%22).split(%22%2C%22)%2Cn%3Dn.map(function(n)%7Breturn%20n.trim()%7D)%7Dfunction%20e(n)%7Breturn%20n.replace(%22%23%22%2C%22No.%22)%7Dfunction%20a(n)%7Bvar%20o%3Dn.match(%2F%5C(.*%5C)%2F)%3Breturn%20null!%3D%3Do%26%26(n%3Dn.replace(o%2C%22%22))%2Cn%7Dfunction%20i(n)%7Breturn%20n.replace(%22%20%20%22%2C%22%20%22)%7Dfunction%20s(n)%7Bvar%20o%3Dn.match(%2Fby(.*)%2F)%3Breturn%20null!%3D%3Do%26%26(n%3Do%5B1%5D.trim())%2Cn%7Dfunction%20c(n%2Co)%7Bvar%20t%3D%22%22%2Cr%3D%22%22%2Ce%3DjQuery(o).text().toLowerCase().replace(%2F%5Cr%3F%5Cn%7C%5Cn%2Fgm%2C%22%7C%22).split(%22%7C%22)%2Cc%3De.reIndexOf(%2Fperformed%2F)%3Bt%3De%5B0%5D%2Cc%3E-1%3Fr%3De%5Bc%5D%3A(c%3De.reIndexOf(%2Fcomposed%2F)%2Cc%3E-1%3Fr%3De%5Bc%5D%3A(c%3De.reIndexOf(%2Fwritten%2F)%2Cc%3E-1%26%26(r%3De%5Bc%5D)))%2Cr%3Da(r)%2Cr%3Di(r)%2Cr%3Ds(r)%2Cf.push(%7BsongName%3At%2CsongArtist%3Ar%7D)%7Dfunction%20u()%7B%22undefined%22%3D%3Dtypeof%20Array.prototype.reIndexOf%26%26(Array.prototype.reIndexOf%3Dfunction(n)%7Bfor(var%20o%20in%20this)if(this%5Bo%5D.toString().match(n))return%20o%3Breturn-1%7D)%3Bvar%20n%3DjQuery(%22%23soundtracks_content%22)%2Co%3Dn.find(%22.header%20.nav%20.desc%22).text()%3Bo%3Do.match(%2F%5Cd%2B%2F)%2Cconsole.log(%22Found%20%22%2Bo%2B%22%20songs%20on%20this%20list.%22)%2Cn.find(%22.list%22).children().each(c)%3Bvar%20t%3D%5B%5D%3Bf.forEach(function(n%2Co)%7Bt%2B%3Dn.songArtist%2B%22%20-%20%22%2Bn.songName%2Co%3Cf.length-1%26%26(t%2B%3D%22%5Cr%5Cn%22)%7D)%2Cprompt(%22%23%22%2Bf.length%2B%22%20songs%20found.%20Copy%20to%20clipboard%3A%20Ctrl%2BC%2C%20Enter%22%2Ct)%7Dfunction%20l()%7Bif(location.host.match(%2Fgrooveshark%5C.com%2F))return%20o()%2C%22GrooveShark.com%22%3Bif(location.host.indexOf(%22imdb.com%22)%3E-1)%7Bvar%20n%3Dlocation.pathname.split(%22%2F%22)%3Breturn%22soundtrack%22%3D%3D%3Dn%5Bn.length-1%5D%3F(u()%2C%22IMDB.com%22)%3A(alert(%22Error%3A%20Sorry%2C%20not%20an%20IMDB%20Soundtrack%20page!%22)%2C!1)%7Dt()%7Dvar%20p%3D%22YOUR_TINYSONG_API_KEY_HERE%22%2Cf%3D%5B%5D%3Bl()%7D(jQuery)%7D)(jQuery.noConflict(true))%7Dvar%20s%3Ddocument.createElement(%22script%22)%3Bs.src%3D%22https%3A%2F%2Fajax.googleapis.com%2Fajax%2Flibs%2Fjquery%2F1.7.1%2Fjquery.min.js%22%3Bif(s.addEventListener)%7Bs.addEventListener(%22load%22%2Ccallback%2Cfalse)%7Delse%20if(s.readyState)%7Bs.onreadystatechange%3Dcallback%7Ddocument.body.appendChild(s)%3B%7D)()