export interface ISchema {
	name: string;
	schema:
		{
			name:string;
			subSchema:
				{
					name:string;
					value:string;
				}
		}
}
