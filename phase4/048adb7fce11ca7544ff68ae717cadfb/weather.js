$.ajax({
	type: "GET" 
	url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:47906", 
	dataType: 'jsonp', 
	headers:{token: "cwkXWvVwYtigAEPFCejKhRDuilPahMaT"}, 
	jsonCallback: 'resultHandler'
})

//www.ncdc.noaa.gov/cdo-web/api/v2/locationcategories

{
	"metadata": {
		"resultset": {
			"offset": 1,
			"count": 12,
			"limit": 25
		}
	},
	"results": [
		{
			"name": "City",
			"id": "CITY"
		},
		{
			"name": "Climate Division",
			"id": "CLIM_DIV"
		},
		{
			"name": "Climate Region",
			"id": "CLIM_REG"
		},
		{
			"name": "Country",
			"id": "CNTRY"
		},
		{
			"name": "County",
			"id": "CNTY"
		},
		{
			"name": "Hydrologic Accounting Unit",
			"id": "HYD_ACC"
		},
		{
			"name": "Hydrologic Cataloging Unit",
			"id": "HYD_CAT"
		},
		{
			"name": "Hydrologic Region",
			"id": "HYD_REG"
		},
		{
			"name": "Hydrologic Subregion",
			"id": "HYD_SUB"
		},
		{
			"name": "State",
			"id": "ST"
		},
		{
			"name": "US Territory",
			"id": "US_TERR"
		},
		{
			"name": "Zip Code",
			"id": "ZIP"
		}
	]
}