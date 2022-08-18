// Login Json params (login, password);
// POST https://splastun2.node.shpp.me/api/login
{
  "login": "ivan",
  "password": "password"
}

              >>> Album <<<
//  Create album Json params (album_name, album_location, date). User must be  authorized.
    // POST https://splastun2.node.shpp.me/api/album
    
// Get albums json params (). User must be authorized. return albums based on jwt token
    // GET https://splastun2.node.shpp.me/api/albums
    
// Get album Json params (), query parameter album id. User must be authorized.
    // GET https://splastun2.node.shpp.me/api/album/<album id>

//Update album Json params (album_id, album_logo?, album_name?, album_location?, date?). User must be authorized.
    // PUT https://splastun2.node.shpp.me/api/album

// Delete album query param album_id. User must be authorized.
    // DELETE https://splastun2.node.shpp.me/api/album/<album id>
    
    
            >>> Photo <<<    
// Add one photo json params(album_id, file). User must be  authorized.
    // POST https://splastun2.node.shpp.me/api/photos
            
// Add one photo json params(album_id, file). User must be  authorized.
    // POST https://splastun2.node.shpp.me/api/photos
