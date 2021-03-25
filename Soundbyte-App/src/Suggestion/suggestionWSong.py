#Temp python script, returns fake data.
import sys
import json

g = open("./log.txt","w")
thisdict = {
    "songs": [
        {
            "songName": "song1New",
            "author": "auth1",
            "features": {
                "bpm": 100,
                "key": "A",
                "scale": "Minor" 
            }
        },
        {
            "songName": "song2New",
            "author": "auth2",
            "features": {
                "bpm": 200,
                "key": "B",
                "scale": "Major" 
            }
        },
        {
            "songName": "song3New",
            "author": "auth3",
            "features": {
                "bpm": 300,
                "key": "C",
                "scale": "Minor" 
            }
        }

    ]
}

#inputFeatures = json.loads(sys.argv)
#print(sys.argv[1])
#input = sys.argv[1]
#songFeat = json.loads(input) #input = sys.argv[1]

with open('./Libraries/songLibrary/library.json') as f:
    data = json.load(f)

#for d in data:
inputTemp = sys.argv[1]
inputValue = json.loads(inputTemp)
#print(json.dumps(inputValue["features"]["bpm"]))
#inputValue = json.loads(inputTemp)
#print(inputValue["songName"])
output = json.dumps(data)
print(output)
#output = json.loads(sys.argv[0])
#g.write(sys.argv[1])
#print(sys.argv[1],flush =True)
sys.stdout.flush()