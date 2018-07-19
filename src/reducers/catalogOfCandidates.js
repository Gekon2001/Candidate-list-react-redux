import base from '../json/baseOfCandidates.json';

var countBase = 20000;
var importedElement = base.map((item)=> { 
		return {...item, id:'idImportedElement' + countBase++, editState: false}
	})
var newElement = () => {
	var newElement = {};
	if (importedElement) {
	var keyForBase = Object.keys(importedElement[0]).slice(0, -2);
		for(var key in keyForBase) {
			newElement[keyForBase[key]] = "";
			}
		return (
			newElement
		)
	}
};

const catalogOfCandidates = (state={catalog: importedElement}, action)=>{
	switch(action.type) {
		case 'ADD ITEM': return {catalog: [...state.catalog, {...newElement(), id: action.id, editState: true}]}
		case 'ADD ITEM FROM FILE': return {catalog: [...state.catalog, {...action.payload, id: action.id, editState: false}]}
		case 'ADD ITEM FROM BASE': return {catalog: importedElement}
		case 'DELETE ITEM': return {catalog: state.catalog.filter(item => (item.id !== action.id))}
		case 'DELETE ALL ITEMS': return {catalog:[]}
		case 'EDIT ITEM': return {catalog: state.catalog.map(item => {if (item.id===action.id) {return {...item, editState: true}} else {return {...item}}})}
		case 'SAVE ITEM': return {catalog: state.catalog.map(item => {if (item.id===action.id) {return {...action.payload, id: item.id, editState: false}} else {return {...item}}})}
		case 'ABORT SAVE ITEM': return {catalog: state.catalog.map(item =>{ if (item.id===action.id) {return {...item, editState: false}} else {return {...item}}})}
		default: return state;
	}
}

export default catalogOfCandidates