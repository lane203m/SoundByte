import sys
import json
import math

def PercentBPM(InSong,LibSong):
    if (InSong > LibSong):
        return (LibSong/InSong - 1)*100
    else:
        return (InSong/LibSong - 1)*100

def PercentComNotes(InKey,LibKey):
    if (InKey == LibKey):
        return 1*100
    else:
        return 0.5*100

inputValue = json.loads(sys.argv[1])

with open('./Libraries/songLibrary/library.json') as f:
    data = json.load(f)

songResults = list()

for d in data['songs']:
    score = PercentBPM(d['features']['bpm'],inputValue['bpm']) + PercentComNotes(d['features']['key'],inputValue['key'])
    d['score'] = score
    songResults.append(d)

#output = list()
#for song in songResults.values():
    #output.append(song)

print(json.dumps(songResults))
sys.stdout.flush()