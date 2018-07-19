import { v4 } from 'node-uuid';

export const addItem = () => {
	return ({
	type: 'ADD ITEM',
	id: v4()
	})
}

export const addItemFromBase = () => {
	return ({
	type: 'ADD ITEM FROM BASE',
	id: v4()
	})
}

export const addItemFromFile = (item) => {
	return ({
	type: 'ADD ITEM FROM FILE',
	id: v4(),
	payload: item
	})
}

export const deleteItem = (id) => (
	{
	type: 'DELETE ITEM',
	id: id
	}
)

export const editItem = (id) => (
	{
	type: 'EDIT ITEM',
	id: id
	}
)

export const saveItem = (item, id) => (
	{
	type: 'SAVE ITEM',
	payload: item,
	id: id
	}
)

export const abortSaveItem = (id) => (
	{
	type: 'ABORT SAVE ITEM',
	id: id
	}
)

export const deleteAllItems = () => (
	{
		type: 'DELETE ALL ITEMS'
	}
)



