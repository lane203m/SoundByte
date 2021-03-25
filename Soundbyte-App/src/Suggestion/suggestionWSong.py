import sys
import json
import math

def PercentBPM(InSong,LibSong):
    if (InSong > LibSong):
        return (1 - LibSong/InSong)
    else:
        return (LibSong/InSong - 1)

def PercentComNotes(InKey,LibKey):
    if (InKey == LibKey):
        return 1
    else:
        return 0.5

inputValue = json.loads(sys.argv[1])

with open('./Libraries/songLibrary/library.json') as f:
    data = json.load(f)

songResults = dict()
for d in data['songs']:
    score = PercentBPM(d['features']['bpm'],inputValue['features']['bpm']) + PercentComNotes(d['features']['key'],inputValue['features']['key'])
    songResults[score] = d

output = list()
for song in songResults.values():
    output.append(song)

print(json.dumps(output))
sys.stdout.flush()