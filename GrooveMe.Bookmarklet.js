javascript:(function()%7Bfunction%20callback()%7B(function(%24)%7Bvar%20jQuery%3D%24%3B(function(%24)%7Bvar%20apiKey%20%3D%20%22YOU_TINYSONG_API_KEY_HERE%22%3Bfunction%20putSongsInList(%20songsArray%2C%20_apiKey%20)%7Bif%20(%20typeof%20Grooveshark%20%3D%3D%3D%20%22undefined%22%20)%20return%3BsongsArray%20%3D%20prompt(%22Paste%20the%20Song%20List%20in%20here%3A%22)%3BsongsArray%20%3D%20songsArray.replace(%2F%5C%22%7C%5C%5B%7C%5C%5D%2Fg%2C%22%22).split(%22%2C%22)%3BsongsArray%20%3D%20songsArray.map(function(song)%7Breturn%20song.trim()%3B%7D)%3Bvar%20ajaxCalls%20%3D%20%5B%5D%3B%20%2F***%20%3C--%20This%20is%20the%20array%20that%20will%20hold%20all%20of%20the%20Ajax%20objects%20***%2F%2F***%20For%20each%20song%20name%2C%20we%20need%20to%20fire%20one%20Ajax%20call%20to%20the%20TinySong%20API%20***%2FsongsArray.forEach(function(song)%7Bvar%20url%20%3D%20%22http%3A%2F%2Ftinysong.com%2Fb%2F%22%20%2B%20song%20%2B%20%22%3Fformat%3Djson%26key%3D%22%20%2B%20apiKey%3Bconsole.log(%22Pushing%20Song%3A%20%22%2C%20url%2C%22%5Cn%22)%3BajaxCalls.push(%20%20%24.get(%20url%20)%20%20)%3B%7D)%3B%24.when.apply(%20null%2C%20ajaxCalls%20).then(function()%7Bvar%20SongIdList%20%3D%20%5B%5D%3Bvar%20ajaxCallsReturned%20%20%3D%20%5B%5D.slice.apply(arguments)%3B%20%2F***%20arguments%20is%20an%20array%20of%20jqXHR%20objects%20returned%20from%20our%20Ajax%20calls%20***%2FajaxCallsReturned.forEach(function(data%2Ci)%7Bvar%20_songId%20%3D%20JSON.parse(data%5B0%5D).SongID%3B%2F***%20If%20the%20song%20is%20found%20by%20the%20API%2C%20add%20it%20to%20our%20array%20of%20Song%20IDs%20***%2Fif%20(%20_songId%20!%3D%3D%20undefined%20)%20SongIdList.push(%20_songId%20)%3B%7D)%3B%2F***%20Add%20our%20list%20of%20songs%20to%20our%20current%20playlist%3A%20http%3A%2F%2Fdevelopers.grooveshark.com%2Fdocs%2Fjs_api%2F%23addSongsByID%20***%2Fwindow.Grooveshark.addSongsByID(%20SongIdList%20)%3B%7D%2C%20function()%7B%20console.log(%22Error...%22)%3B%20%7D)%3B%7Dfunction%20getSongsList()%7Bvar%20songList%20%3D%20prompt(%22Enter%20the%20jQuery%20selector%20with%20the%20song%20list%3A%22)%3Bvar%20songListArray%20%3D%20%5B%5D%3B%24(songList).each(function(index%2Cel)%7BsongListArray.push(%20%24(el).text()%20)%3B%7D)%3BputSongsInList(%20songListArray%2C%20apiKey%20)%3Bconsole.log(songListArray)%3Bprompt(%22Copy%20to%20clipboard%3A%20Ctrl%2BC%2C%20Enter%22%2C%20songListArray)%3Breturn%20songListArray%3B%7Dif%20(%20location.host.match(%2Fgrooveshark%5C.com%2F)%20)%20%7BputSongsInList()%3B%7D%20else%20%7BgetSongsList()%3B%7D%2F*putSongsInList(%5B%22Danny%20Norbury%20-%20I%20turn%20off%20the%20last%20light%20and%20close%20the%20door%22%2C%22Monolake%20%20-%20Mass%20Transit%20Railway%22%2C%22Alva%20Noto%20-%20Xerrox%20Monophaser%201%22%2C%22Lee%20Gamble%20-%20Rufige%22%2C%22Laurie%20Spiegel%20-%20Pentachrome%22%2C%22Dopplereffekt%20-%20Calabi%20Yau%20Manifold%22%2C%22Oneohtrix%20Point%20Never%20-%20Russian%20Mind%22%2C%22Ekoclef%20-%20Here%20Comes%20Trouble%22%5D%2C%20apiKey%20)%3B*%2F%7D(jQuery))%7D)(jQuery.noConflict(true))%7Dvar%20s%3Ddocument.createElement(%22script%22)%3Bs.src%3D%22https%3A%2F%2Fajax.googleapis.com%2Fajax%2Flibs%2Fjquery%2F1.7.1%2Fjquery.min.js%22%3Bif(s.addEventListener)%7Bs.addEventListener(%22load%22%2Ccallback%2Cfalse)%7Delse%20if(s.readyState)%7Bs.onreadystatechange%3Dcallback%7Ddocument.body.appendChild(s)%3B%7D)()