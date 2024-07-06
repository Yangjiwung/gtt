import json
from datetime import datetime
from Mapper import ModelMapper
from DTO import Player, Team, Match, Tournament
from Entity import ServerPlayer, ServerTeam, ServerMatch, ServerTournament

# JSON 데이터 읽기
json_data = '''
{
    "tournament": {
        "id": 1,
        "name": "LCK 2024 Spring",
        "startDate": "2024-01-17",
        "endDate": "2024-03-24",
        "region": null,
        "country": "Korea",
        "league": "LCK/2024 Season/Spring Season",
        "matches": [
            {
                "matchId": 1,
                "serverTeam1": {
                    "id": 1,
                    "teamName": "Dplus KIA",
                    "image": "Dplus KIAlogo profile.png",
                    "location": "South Korea",
                    "rosterPhoto": "DPLUS Spring 2024.jpg",
                    "players": [
                        {
                            "id": 1,
                            "nickName": "Aiming",
                            "name": "Kim Ha-ram",
                            "nameFull": "Kima Ha-ram (김하람)",
                            "country": "South Korea",
                            "age": 23,
                            "birthdate": "2000-07-20",
                            "team": null,
                            "role": null,
                            "favChamps": [
                                "Ezreal",
                                "Kai'Sa"
                            ],
                            "birthdatePrecision": "2000-07-20"
                        }
                    ]
                }
            }
        ]
    }
}
'''

# DTO 클래스와 SQLAlchemy 엔티티 간의 매핑 정의
mapping = {
    ServerTournament: Tournament,  # JSON 데이터의 최상위 객체인 딕셔너리와 Tournament 클래스 매핑
    dict: Match,       # JSON 데이터의 matches 항목과 Match 클래스 매핑
    dict: Team,        # JSON 데이터의 팀 정보와 Team 클래스 매핑
    dict: Player       # JSON 데이터의 선수 정보와 Player 클래스 매핑
}

# ModelMapper 객체 생성
mapper = ModelMapper(mapping)

# JSON 데이터를 딕셔너리로 변환
data = json.loads(json_data)

# 딕셔너리를 DTO 객체로 변환
tournament_dto = mapper.map(data['tournament'])

# 변환된 객체 출력
print(tournament_dto)
# # JSON 데이터 파싱
# data = json.loads(json_data)
# # ModelMapper 생성
# mapper = ModelMapper({
#     ServerPlayer: Player,
#     ServerTeam: Team,
#     ServerMatch: Match,
#     ServerTournament: Tournament
# })
#
# # 토너먼트(Tournament) 객체 변환
# tournament_dto = mapper.map(data['tournament'])
#
# # 결과 출력
# print(tournament_dto)
