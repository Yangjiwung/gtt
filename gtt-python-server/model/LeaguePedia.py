from mwrogue.esports_client import EsportsClient
import datetime as dt
from DTO import Match, Team, Player, Tournament
from Entity import ServerPlayer, ServerTeam, ServerMatch, ServerTournament, ServerPlayerRole, ServerPlayerFavChamp, \
    engine, ServerTeamServerPlayer
from sqlalchemy.orm import Session

# SQLAlchemy 세션 생성
session = Session(engine)

site = EsportsClient("lol")


def get_teams():
    results = site.cargo_client.query(
        tables="Teams=T",
        fields="T.Name=TeamName,T.Image,T.Location,T.RosterPhoto",
        where="T.Region='Korea'"
    )


def get_players(team_name):
    response = site.cargo_client.query(
        tables="Players=P",
        fields="P.ID=NickName,P.Name,P.NameFull,P.Country,P.Age,P.Birthdate,P.Team,P.Role,P.FavChamps",
        where='P.TeamLast="%s" AND P.Team IS NOT NULL AND (P.Role="Top" OR P.Role="Mid" OR P.Role="Bot" OR P.Role="Jungle" OR P.Role="Support")' % team_name
    )
    players = []
    for player in response:
        ServerPlayer(id=None, nick_name=player["NickName"], name=player["Name"], name_full=player["NameFull"],
                     age=int(player["Age"]), birth_date=dt.datetime.strptime(player["Birthdate"], '%Y-%m-%d'))
        players.append(Player(player.get("NickName"), player.get("Name"), player.get("NameFull"), player.get("Country"),
                              player.get("Age"), player.get("Birthdate"), player.get("Role"), player.get("FavChamps")))


def getTeamWithPlayers():
    teams = []
    results = site.cargo_client.query(
        tables="Teams=T",
        fields="T.Name=TeamName,T.Image,T.Location,T.RosterPhoto",
        where="T.Region='Korea'"
    )

    for result in results:
        response = site.cargo_client.query(
            tables="Players=P",
            fields="P.ID=NickName,P.Name,P.NameFull,P.Country,P.Age,P.Birthdate,P.Team,P.Role,P.FavChamps",
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
    # 팀과 선수 정보를 데이터베이스에 저장합니다.
    print(session)
    for team in teams:
        print(team)
        for player in team.players:
            print(player)
        # 팀 정보를 데이터베이스에 저장합니다.
        server_team = ServerTeam(
            id=None,
            team_name=team.team_name,
            location=team.location,
            image=team.image,
            roster_photo=team.roster_photo
        )
        session.add(server_team)
        session.commit()  # 팀 정보를 데이터베이스에 저장합니다.

        for player in team.players:
            # 선수 정보를 데이터베이스에 저장합니다.
            server_player = ServerPlayer(
                id=None,
                nick_name=player.nick_name,
                name=player.name,
                name_full=player.name_full,
                country=player.country,
                age=player.age,
                birth_date=player.birth_date,
                team_img=team.image,
            )
            session.add(server_player)
            session.commit()  # 선수 정보를 데이터베이스에 저장합니다.

            # 선수의 역할을 데이터베이스에 저장합니다.
            roles = player.roles.split(",")  # 쉼표로 구분된 문자열을 리스트로 변환합니다.
            for role in roles:
                server_player_role = ServerPlayerRole(
                    server_player_id=server_player.id,
                    roles=role
                )
                session.add(server_player_role)
                session.commit()  # 선수의 역할을 데이터베이스에 저장합니다.

            # 선수의 선호 챔피언을 데이터베이스에 저장합니다.
            if player.fav_champs != None:
                fav_champs = player.fav_champs.split(",")  # 쉼표로 구분된 문자열을 리스트로 변환합니다.
                for fav_champ in fav_champs:
                    server_player_fav_champ = ServerPlayerFavChamp(
                        server_player_id=server_player.id,
                        fav_champs=fav_champ
                    )
                    session.add(server_player_fav_champ)
                    session.commit()  # 선수의 선호 챔피언을 데이터베이스에 저장합니다.

            # 팀과 선수의 관계를 데이터베이스에 저장합니다.
            server_team_server_player = ServerTeamServerPlayer(
                server_team_id=server_team.id,
                server_players_id=server_player.id
            )
            session.add(server_team_server_player)
            session.commit()  # 팀과 선수의 관계를 데이터베이스에 저장합니다.


def get_matches_with_team(tournament_name):
    response = site.cargo_client.query(
        tables="MatchSchedule=MS",
        fields="MS.OverviewPage=League,MS.Team1,MS.Team2,MS.Team1Score,MS.Team2Score,MS.DateTime_UTC",
        where=f'MS.OverviewPage="{tournament_name}"',
        order_by="MS.DateTime_UTC DESC"
    )
    for item in response:
        print(item)
        team1_score = int(item['Team1Score']) if item['Team1Score'] is not None else 0
        team2_score = int(item['Team2Score']) if item['Team2Score'] is not None else 0
        # 팀 정보 가져오기
        team1 = session.query(ServerTeam).filter_by(team_name=item['Team1']).first()
        team2 = session.query(ServerTeam).filter_by(team_name=item['Team2']).first()
        match = ServerMatch(
            match_date=dt.datetime.strptime(item['DateTime UTC'], '%Y-%m-%d %H:%M:%S'),
            league=item["League"],
            team1score=team1_score,
            team2score=team2_score,
            team1=team1,
            team2=team2
        )

        # 서버 매치 객체를 데이터베이스에 추가
        session.add(match)
        session.commit()


def get_tournament_with_matches():
    return



Leagues = site.cargo_client.query(
    tables="Tournaments=T, TournamentResults=TS",
    join_on="T.OverviewPage=TS.OverviewPage",
    group_by="T.OverviewPage",
    fields="T.OverviewPage=LeagueName,T.Name,T.DateStart,T.Date,T.League,T.Region,T.Prizepool,T.Country,T.EventType,T.TournamentLevel, TS.Team=Challenger",
    where="T.Region='Korea' AND T.Date IS NOT NULL AND T.Region IS NOT NULL AND TS.Place=1",
    order_by="T.Date ASC"
)
for league in Leagues:
    print(league)
    # 서버 토너먼트 객체 생성
    start_date = None
    end_date = None
    if league['DateStart']:
        start_date = dt.datetime.strptime(league['DateStart'], '%Y-%m-%d')
    if league['Date']:
        end_date = dt.datetime.strptime(league['Date'], '%Y-%m-%d')
    get_matches_with_team(league["LeagueName"])
    matches = session.query(ServerMatch).filter_by(league=league["LeagueName"]).all()
    tournament = ServerTournament(
        league=league['League'],
        name=league['Name'],
        country=league['Country'],
        region=league['Region'],
        start_date=start_date,
        end_date=end_date,
        challenger=league['Challenger'],
        matches=matches
    )

    # 서버 토너먼트 객체와 관련된 매치 가져오기
    # 여기서는 LeagueName으로 매치를 찾지 않고, LeagueName이 토너먼트의 이름인지 확인하고 있습니다.
    matches = session.query(ServerMatch).filter_by(league=league['LeagueName']).all()

    # 매치와 토너먼트 연결
    for match in matches:
        tournament.matches.append(match)

    # 서버 토너먼트 객체를 데이터베이스에 추가
    session.add(tournament)
    session.commit()

# date = "2024-01-25"
# date = dt.datetime.strptime(date, "%Y-%m-%d").date()
# response = site.cargo_client.query(
#     tables="ScoreboardGames=SG, ScoreboardPlayers=SP, Tournaments=T",
#     join_on="SG.GameId=SP.GameId, SG.OverviewPage=T.OverviewPage",
#     fields="T.Name=Tournament, SG.DateTime_UTC, SG.Team1, SG.Team2, SG.Winner, SG.Patch, SP.Link, SP.Team, SP.Champion, SP.SummonerSpells, SP.KeystoneMastery, SP.KeystoneRune, SP.Role, SP.GameId, SP.Side",
#     where="SG.DateTime_UTC >= '" + str(date) + " 00:00:00' AND SG.DateTime_UTC <= '" + str(date+dt.timedelta(1)) + " 00:00:00' AND T.Region='Korea' AND T.Date IS NOT NULL",
# )
# for item in response:
#     print(item)


# page_to_query = "Data:LCK CL/2024 Season/Spring Playoffs"
# response = site.cargo_client.query(
#     tables="TournamentRosters=TR",
#     fields="TR.Team,TR.OverviewPage=League,TR.RosterLinks,TR.Roles",
#     where="TR.OverviewPage='LCK/2024 Season/Spring Season'",
# )
# for item in response:
#     print(item)
