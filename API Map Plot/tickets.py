import json, requests


def get_ticket_data(d):
	array = [[], [], []]
	data = requests.get(d).text
	json_data = json.loads(data)
	for i in json_data:
		if i.get('latitude'):
			array[0].append(float(i['latitude']))
		if i.get('longitude'):
			array[1].append(float(i['longitude']))
		if i.get('viodesc'):
			array[2].append(i['viodesc'])                                                      
	#json_loads(array)
	return json.dumps(array)
	#mydict.get('key', default)