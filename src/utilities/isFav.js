export default function isFav(arr, path, id) {

    // if on favs page, return true
    if( path == '/favs' ) {
        return true;
    }


    // if no favourites at all, false
    if(arr.length == 0) {
        return false;
    }

    // check whether the current object
    // is in the array of favs
    return arr.some( obj => obj.id == id);
}
