//HELPER FUNCTIONS FOR THE FRONT-END

export const check = x => x ? x.target ? x.target.value ? true : false : false : false

export const capital = str => str.charAt(0).toUpperCase() + str.slice(1);

export const handleSearchError = data => {
    const { zipcode, tree_id, status, health, spc_common, spc_latin } = data
    if(!zipcode && !tree_id && !status && !health && !spc_common && !spc_latin) 
    return true

    if( (zipcode && isNaN(Number(zipcode))) || 
    (tree_id && isNaN(Number(tree_id))) || 
    (status && !isNaN(Number(status))) ||
    (health && !isNaN(Number(health))) ||
    (spc_common && !isNaN(Number(spc_common))) ||
    (spc_latin && !isNaN(Number(spc_latin))))
    return true

    return false
}

export const handleInputs = data => {
  if(!data.name || !data.email || !data.password || !data.password2) return true
  if(data.password !== data.password2) return true
  return false
}

export const filterNoLabeled = (arr1, arr2) => {
    if(!arr1 || !arr2 || !arr1.length || !arr2.length) return []

    //Not the best BigO
    let res = [], j, cont=0
    for(let i=0 ; i<arr2.length ; i++){
        cont = 0
        for(j=0 ; j<arr1.length ; j++){
            if(arr1[j].tree_id !== arr2[i].tree_id) cont++
        }
        if(cont === j) { 
            res.push(arr2[i])
            cont = 0
        }
    }
    return res
}

export const treeFilter = (arr1, arr2) => {
    if(!arr1 || !arr2 || !arr1.length || !arr2.length) return []
    return arr2.filter(a => arr1.map(b => a.tree_id !== b.tree_id))
}