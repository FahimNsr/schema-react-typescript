import { FC , useState} from 'react'
import { ISchema } from "../models"


interface props {
  schemaList: ISchema[];
  setSchemaList: React.Dispatch<React.SetStateAction<ISchema[]>>;
}

const SchemaList: FC<props> = ({ schemaList, setSchemaList}) => {

	const [updatedVal, setUpdatedVal] = useState<string>("")

  const updateSchema = (name: string, value: string) : void => {
		const editingSchema = schemaList.find((item) => item.schema.subSchema.name === name)
		editingSchema ? editingSchema.schema.subSchema.value = value : setSchemaList([...schemaList])
	}

	const deleteSchema = (name: string) : void => {
		const newList = schemaList.filter(item => item.schema.subSchema.name !== name)
		setSchemaList(newList)
	}

  return (
    <div className="flex-row my-2">
      <div className="col-auto">
        {schemaList && 
					<>
						{schemaList.map((sl,index) =>{
							return (
								<div className="my-2" key={index}>
				 					<button className="btn btn-sm btn-secondary m-1">{sl.name}</button>
				 					<button className="btn btn-sm btn-secondary m-1">{sl.schema.name}</button>
				 					<button className="btn btn-sm btn-secondary m-1">{sl.schema.subSchema.name}</button>
									<input
										name="updateSchema"
										type="text"
										placeholder={sl.schema.subSchema.value}
										onChange={(e) => {
											setUpdatedVal(e.target.value);
										}}
								 	/>
				 					<button
					 					className="btn btn-sm btn-primary m-1"
					 					onClick={() => {
						 					(updateSchema(sl.schema.subSchema.name, updatedVal));
					 					}}
				 					>
					 					edit
				 					</button>
				 					<button
					 					className="btn btn-sm btn-danger"
					 					onClick={() => {
						 					deleteSchema(sl.schema.subSchema.name)
					 					}}
				 					>
					 					delete
				 					</button>
								</div>
							)
						})}
					</>
				}
      </div>
    </div>
  )
}

export default SchemaList