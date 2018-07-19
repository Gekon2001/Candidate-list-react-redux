import React from 'react';
import { connect } from 'react-redux';
import {CSVLink} from 'react-csv';
import { saveAs } from 'file-saver/FileSaver';

import * as actions from '../action/actions';




const CandidateListAppInfo = ({catalog, dispatch}) => {
	
	function onFileLoad(elementId, event) {
  		var importedCandidate = event.target.result;
  		importedCandidate = JSON.parse(importedCandidate);
  		for(var i = 0; i < importedCandidate.length; i++) {
  			dispatch(actions.addItemFromFile(importedCandidate[i]))
  			console.log(importedCandidate[i])
  		}
  		
	}

	function onChooseFile(event, onLoadFileHandler) {
		if (typeof window.FileReader !== 'function')
		    throw new Error("The file API isn't supported on this browser.");
		let input = event.target;
		if (!input)
		    throw new Error("The browser does not properly implement the event object");
		if (!input.files)
		    throw new Error("This browser does not support the `files` property of the file input.");
		if (!input.files[0])
		return undefined;
		let file = input.files[0];
		let fr = new FileReader();
		fr.onload = onLoadFileHandler;
		fr.readAsText(file);
	}


	// База со всеми данными для экспорта
	var jsxBase = catalog.map(item => {
		var newItem = Object.assign({}, item);
		for(var key in newItem) {
			if (key === "id" || key === "editState") {delete newItem[key]}
		}
		return (newItem)
	});
	// Экспорт в json формате в файл
	var jsxSaver = () => {
		var blob = new Blob([JSON.stringify(jsxBase)], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "CandidateJson.txt");
};
	//служебный объект для передачи введеных данных в action creator 
	var editedInput = {};

	// Если есть данные то строится таблица, если данных нет строится соответствующее уведомление
	 if (catalog.length) {
	 	var keyForBase = Object.keys(catalog[0]).slice(0, -2);
	 	return (
	 		<div className="candidate-list-app-info">
	 			<table id="app-table">
	 				  	<colgroup>
    						<col span="1" />
    						<col span={keyForBase.length+1}/>
  						</colgroup>
					<thead>
						<tr>
							<th>#</th>
							{keyForBase.map(item => (
								<th key={item}>{item}</th>
								))}
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{catalog.map((item, index) => (
						<tr id={item.id} key={"tr-candidateNumber" + index}>
							<td>
								{index + 1}
							</td>
							{keyForBase.map(key => (
								
								<td key={key + "td-candidateNumber" + index}>
									{!item.editState?(item[key]) : (
										<input type="text" defaultValue={item[key]}/>
										)}
								</td>

							
							))}
							{item.editState?(
								<td>
									<button className="candidate-list-button-element candidate-list-button-save" onClick={()=> {var a = document.getElementById(item.id).getElementsByTagName("input");
										for (var i = 0; i < a.length; i++) {
											editedInput[keyForBase[i]] = a[i].value;
										} 
										dispatch(actions.saveItem(editedInput, item.id));
									
										}}>Save</button>
									<button className="candidate-list-button-element candidate-list-button-cancel" onClick={()=>{dispatch(actions.abortSaveItem(item.id))
														  }}>Cancel</button>
								</td> ): (
								<td>
									<button className="candidate-list-button-element candidate-list-button-edit" onClick={()=>{dispatch(actions.editItem(item.id))}}
										>Edit</button>
									<button className="candidate-list-button-element candidate-list-button-delete" onClick={()=>{
										dispatch(actions.deleteItem(item.id))
									}}>Delete</button>
								</td>
							)
							}
						</tr>
							))}
					</tbody>
				</table>
				<div className="candidate-list-button-catalog-container">
					<CSVLink id="csv-export" className="candidate-list-button-catalog candidate-list-button-catalog-csv" data={jsxBase}>Экспорт в csv</CSVLink>
					<button className="candidate-list-button-catalog candidate-list-button-catalog-json" onClick={()=>{
						jsxSaver();
					}}>экспорт в json</button>
					<button className="candidate-list-button-catalog candidate-list-button-catalog-add" onClick={()=>{
						dispatch(actions.addItem())
					}}>Добавить</button>
					
					<button className="candidate-list-button-catalog candidate-list-button-catalog-loadbase" onClick={()=>{
						dispatch(actions.addItemFromBase())}}
					>Загрузить данные</button>
					<button className="candidate-list-button-catalog candidate-list-button-catalog-deleteall" onClick={()=>{
						dispatch(actions.deleteAllItems())
					}}>Удалить все</button>
				</div>
				<label htmlFor="inputfile" className="candidate-list-button-catalog">Импорт данных Json</label>
				<input id="inputfile" type="file" onChange={(event)=>{onChooseFile(event, onFileLoad.bind(this, "contents"))}}/>

				<div style={{background: "#e9e9e9"}}>
		  			<code id="contents"></code>
				</div>

			</div>	
	)} else {
	 	return (<div>
	 				<div className="error">Нет данных для отображения</div>
	 				<div className="candidate-list-button-catalog-container">
						<label htmlFor="inputfile" className="candidate-list-button-catalog candidate-list-button-catalog-loadbase">Импорт данных Json</label>
						<button className="candidate-list-button-catalog candidate-list-button-catalog-add" onClick={()=>{
							dispatch(actions.addItem())
						}}>Добавить</button>
						<button className="candidate-list-button-catalog" onClick={()=>{
						dispatch(actions.addItemFromBase())
						}}>Загрузить данные</button>
						<input id="inputfile" type="file" onChange={(event)=>{onChooseFile(event, onFileLoad.bind(this, "contents"))}}/>
					</div>
	 			</div>)
	 	}
	 }

const mapStateToProps = state => ({catalog: state.catalog});




export default connect(mapStateToProps)(CandidateListAppInfo);



