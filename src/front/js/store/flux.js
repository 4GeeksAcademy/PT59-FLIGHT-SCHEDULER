const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token : null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore : () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded synching the local storage");
				if(token && token != "" && token != undefined) setStore({token:token});
			},

			logout : () => {
				sessionStorage.removeItem("token");
				console.log("Log out");
				setStore({token : null});
			},

			signup : async (first_name, last_name,email,password)=> {

				const opts = {
					method :'POST',
					headers:{
						"content-type" : "application/json"
					},
					body   : JSON.stringify({
						"first_name": first_name,
						"last_name" : last_name,
						"email": email,
						"password" : password
					})
				}
			try{
				const resp = await fetch(process.env.BACKEND_URL+'/api/signup', opts)
					if(resp.status != 200){ 
						alert("There has been some errors");
						return false;
					}
					const data = await resp.json();
						console.log("This comes from backend",data);
						sessionStorage.setItem("token",data.access_token);
						setStore({token : data.access_token, user:data.user})
						return true;
				}
				catch(error){
					console.log("There was error !!!", error);
				}

			},

			login : async (email,password)=> {

				const opts = {
					method :'POST',
					headers:{
						"content-type" : "application/json"
					},
					body   : JSON.stringify({
						"email": email,
						"password" : password
					})
				}
			try{
				const resp = await fetch(process.env.BACKEND_URL+'/api/token', opts)
					if(resp.status != 200){ 
						alert("There has been some errors");
						return false;
					}
					const data = await resp.json();
						console.log("This comes from backend",data);
						sessionStorage.setItem("token",data.access_token);
						setStore({token : data.access_token, user:data.user})
						return true;
				}
				catch(error){
					console.log("There was error !!!", error);
				}

			},



			profile : async (first_name,last_name,email,password)=> {

				const opts = {
					method :'POST',
					headers:{
						"content-type" : "application/json"
					},
					body   : JSON.stringify({
						"first_name": first_name,
						"last_name" : last_name,
						"email": email,
						"password" : password
					})
				}
			
				
				const resp = await fetch(process.env.BACKEND_URL+'/api/token', opts)
					if(resp.status != 200){ 
						alert("There has been some errors");
						return false;
					}
					const data = await resp.json();
						console.log("This comes from backend",data);
						sessionStorage.setItem("token",data.access_token);
						setStore({token : data.access_token, user:data.user})
						return true;
				
				
				
				
			}
		},//end signup

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};

export default getState;
