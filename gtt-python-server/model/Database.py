import json
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from Entity import ServerPlayer, ServerTeam, ServerTournament, ServerMatch

# 데이터베이스 연결 설정
engine = create_engine('sqlite:///example.db')
Session = sessionmaker(bind=engine)
session = Session()

# 토너먼트 정보 추가
data = {"test": "test"}
tournament_data = data["test"]
tournament = ServerTournament(
    id=tournament_data['id'],
    name=tournament_data['name'],
    region=tournament_data['region'],
    country=tournament_data['country'],
    league=tournament_data['league'],
    start_date=datetime.strptime(tournament_data['startDate'], '%Y-%m-%d'),
    end_date=datetime.strptime(tournament_data['endDate'], '%Y-%m-%d')
)
session.add(tournament)

# 매치 정보 추가
matches_data = tournament_data['matches']
for match_data in matches_data:
    match = ServerMatch(
        match_id=match_data['matchId'],
        match_date=datetime.strptime(match_data['matchDate'], '%Y-%m-%d %H:%M:%S'),
        team1score=match_data['team1Score'],
        team2score=match_data['team2Score']
    )

    # 서버 팀 정보 추가
    team1_data = match_data['serverTeam1']
    team2_data = match_data['serverTeam2']
    team1 = ServerTeam(
        id=team1_data['id'],
        team_name=team1_data['teamName'],
        location=team1_data['location'],
        image=team1_data['image'],
        roster_photo=team1_data['rosterPhoto']
    )
    team2 = ServerTeam(
        id=team2_data['id'],
        team_name=team2_data['teamName'],
        location=team2_data['location'],
        image=team2_data['image'],
        roster_photo=team2_data['rosterPhoto']
    )
    match.team1 = team1
    match.team2 = team2

    session.add(match)

# 변경사항 커밋
session.commit()
