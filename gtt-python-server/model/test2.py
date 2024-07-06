from mwrogue.esports_client import EsportsClient
import urllib.request
from DTO import Match, Team, Player, Tournament


def get_filename_url_to_open(site: EsportsClient, filename, player, width=None):
    response = site.client.api(
        action="query",
        format="json",
        titles=f"File:{filename}",
        prop="imageinfo",
        iiprop="url",
        iiurlwidth=width,
    )
    print(response)
    image_info = next(iter(response["query"]["pages"].values()))["imageinfo"][0]

    if width:
        url = image_info["thumburl"]
    else:
        url = image_info["url"]
    print(url)
    #In case you would like to save the image in a specific location, you can add the path after 'url,' in the line below.
    urllib.request.urlretrieve(url, player)


# player = "Faker"
#
# site = EsportsClient("lol")
# response = site.cargo_client.query(
#     limit=1,
#     tables="PlayerImages=PI, Tournaments=T",
#     fields="PI.FileName",
#     join_on="PI.Tournament=T.OverviewPage",
#     where='Link="%s"' % player,
#     order_by="PI.SortDate DESC, T.DateStart DESC"
# )
# url = response[0]['FileName']
# get_filename_url_to_open(site, url, player)
#
# teams = ["Furious Gaming"]
#
# site = EsportsClient("lol")
# for team in teams:
#     url = f"{team}logo square.png"
#     get_filename_url_to_open(site, url, team)


site = EsportsClient("lol")
teams = []
results = site.cargo_client.query(
    tables="Teams=T",
    fields="T.Name=TeamName,T.Image,T.Location,T.RosterPhoto",
    where="T.Region='Korea'"
)

for result in results:
    response = site.cargo_client.query(
        tables="Players=P",
        fields="P.ID=NickName,P.Name,P.NameFull,P.Country,P.Age,P.Birthdate,P.Team,P.Role,P.FavChamps,P.Image",
        where='P.TeamLast="%s" AND P.Team IS NOT NULL AND (P.Role="Top" OR P.Role="Mid" OR P.Role="Bot" OR P.Role="Jungle" OR P.Role="Support")' % (
            result["TeamName"])
        #  AND P.Team IS NOT NULL AND (P.Role="Top" OR P.Role="Mid" OR P.Role="Bot" OR P.Role="Jungle" OR P.Role="Support")
    )
    players = []
    for player in response:
        players.append(
            Player(player.get("NickName"), player.get("Name"), player.get("NameFull"), player.get("Country"),
                   player.get("Age"), player.get("Birthdate"), player.get("Role"), player.get("FavChamps")))
    teams.append(Team(result["TeamName"], result["Location"], result["Image"], result["RosterPhoto"],
                      players)) if players != [] else None

for team in teams:
    print(team)
    url = team.image
    get_filename_url_to_open(site, url, "/Users/taeuknam/Desktop/Develope/ReactProject/gtt-python-server/model/teams/"+team.image)
    for player in team.players:
        print(player)
        response = site.cargo_client.query(
            limit=1,
            tables="PlayerImages=PI, Tournaments=T",
            fields="PI.FileName",
            join_on="PI.Tournament=T.OverviewPage",
            where='Link="%s"' % player.nick_name,
            order_by="PI.SortDate DESC, T.DateStart DESC"
        )
        print(response)
        if response:
            url = response[0]['FileName']
            print(url)
            get_filename_url_to_open(site, url, "/Users/taeuknam/Desktop/Develope/ReactProject/gtt-python-server/model/players/"+player.nick_name+".png")