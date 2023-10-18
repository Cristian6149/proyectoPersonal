
function createStore( validations ){
	let actions = {}
	let template = {}
	let state = {}
	const getValue = value => {
		if(Array.isArray(value)) return Array.from(value)
		if(typeof value == 'object') return {...value}
		return value 
	}
	return ( useKey , value ) =>{
		if(typeof useKey == 'string'){
			let data 
			if(typeof value === 'function' || useKey.split('/').length == 2) {
				if(useKey.split('/').length == 2){
					let id = useKey.split('/')[1]
					useKey = useKey.split('/')[0]
					let lista = getValue(state[useKey])
					for(let key of Object.keys(lista)){
						if(lista[key].id == id) {
							for(let keyUpdate in value){
								lista[key][keyUpdate] = value[keyUpdate]
							}
							break
						}
					}
					data = lista
					console.log( lista)
				}else{
					data = value( () => getValue(state[useKey]) )
				}
				if(validations[useKey]){
					for(let action of validations[useKey]){
						if(!action( state , data )) {
							console.log('fallo la validacion para data ' , data)
							return false
						}
					}
				}
				state[useKey] = data

				for(let action of actions[useKey]){
					action( data )
				}
				
				return 0
			}
		}
		if(value !== undefined){
			if(!validations[useKey]) validations[useKey]= []
			if(validations[useKey]){
				for(let action of validations[useKey]){
					let validation = action( state , value )
					if( validation !== true ) {
						alert( validation )
						return false
					}
				}
			}
			state[useKey] = value
			for(let action of actions[useKey]){
				action( value )
			}
			return 0
		}
		if(typeof useKey === 'string') {
			return getValue(state[useKey])
		}
		for(let key in useKey){
			if(!actions[key]) actions[key] = []
			actions[key].push( value =>{
				useKey[key]( value )
			})
		}
	}
}