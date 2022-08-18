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
    // POST https://splastun2.node.shpp.me/api/photo
    
// Add multiple (>=10) photo json params(album_id, file). User must be  authorized.
    // POST https://splastun2.node.shpp.me/api/photos
            
// GET photos json params (), query parameter photo_id. User must be authorized.
    // GET https://splastun2.node.shpp.me/api/photos/<photo_id>

 // Get photo Json params (photo_id). User must be authorized.
    // GET https://splastun2.node.shpp.me/api/photo
    
// Update photo Json params (photo_id, photo_name). User must be authorized.
    // PUT https://splastun2.node.shpp.me/api/photo
    
// Delete photo query param photo_id. User must be authorized.
    // DELETE https://splastun2.node.shpp.me/api/photo/<photo_id>
