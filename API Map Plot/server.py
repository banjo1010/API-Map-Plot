from bottle import route, run, static_file
from tickets import get_ticket_data


@route("/")
def staticFile():
    return static_file('index.html', root="")


@route("/map.js")
def staticFile2():
    return static_file('map.js', root="")
    

@route('/tickets')
def get_tickets():
    return get_ticket_data("https://data.buffalony.gov/resource/ux3f-ypyc.json")
                    

run(host='0.0.0.0', port=8080)