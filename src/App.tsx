import { FC, useState, useEffect } from 'react'
import { SOA } from 'schema-org-adapter';
import SchemaList from './components/SchemaList';
import { ISchema } from "./models"

const App: FC = () => {
	const [input, setInput] = useState<string>("")
	const [schemas, setSchema] = useState<string[]>([])
	const [property, setProperty] = useState<string>("")
	const [subSchemas, setSubSchema] = useState<string[]>([])
	const [field, setField] = useState<string>("")
	const [val, setVal] = useState<string>("")
	const [schemaList, setSchemaList] = useState<ISchema[]>([])

	const fetchSchema = async () : Promise<void> => {
		const mySdoAdapter = await SOA.create({schemaVersion: "latest"});
		const Instance = mySdoAdapter.getClass(`schema:${input}`);
		setSchema(Instance.getProperties())
	}

	const fetchSubSchema = async () : Promise<void> => {
		const mySdoAdapter = await SOA.create({schemaVersion: "latest"});
		const subInstance = mySdoAdapter.getProperty(property);
		setSubSchema(subInstance.getRanges())
	}

	useEffect(() => {
		if(property){
			fetchSubSchema()
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[property])

	const addSchema = (serach : string, schema:string, subSchema:string, value:string ) : void => {
		const newSchema = {name: serach, schema:{name:schema, subSchema:{name:subSchema, value: value}}}
		setSchemaList([...schemaList, newSchema])
	}

	return (
		<div className="m-4 ">
			<div className="d-flex flex-row justify-content-between ">
				<div className="col-auto">
						<label>Schema: </label>
						<input className="m-1" type="text" onChange={(e) => setInput(e.target.value)} />
						<button className="btn btn-sm btn-outline-secondary" onClick={()=>{fetchSchema()}}>
								Search
						</button>
				</div>
				<div className="col">
					{subSchemas && 
						<>
							{subSchemas.map((subSchema, index)=>{
								return (
								<div key={index}>
									<label className="btn btn-sm btn-dark m-1" onClick={() =>setField(subSchema)}>{subSchema}:</label>
									{field === subSchema && 
										<>
											<input className="m-1" type="text" onChange={(e) => {setVal(e.target.value)}} />
											<button 
												className="btn btn-sm btn-outline-success" 
												onClick={()=>{addSchema(input,property,field,val) }}
											>
												Submit
											</button>
										</>
									}
								</div>)
							})}
						</>
					}
				</div>
			</div>
			<SchemaList schemaList={schemaList} setSchemaList={setSchemaList} />
			<div className="flex-row m-2">
				<div className="col-auto">
					{schemas && 
						<>
							{schemas.map((schema,index) =>{
								return (
									<button
										key={index}
										className="btn btn-sm btn-success opacity-75 m-1"
										onClick={()=>{setProperty(schema)}}
										>
											{schema}
									</button>
								)
							})}
						</>
					}
				</div>
			</div>
		</div>
	)
}

export default App
