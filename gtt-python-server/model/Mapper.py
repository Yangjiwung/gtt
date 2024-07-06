import json
from typing import TypeVar, Type, Dict, Any
from datetime import datetime
from DTO import Player, Team, Match, Tournament
from Entity import ServerPlayer, ServerTeam, ServerMatch, ServerTournament, ServerPlayerRole, ServerPlayerFavChamp

T = TypeVar('T')  # 입력 객체 타입 변수
U = TypeVar('U')  # 출력 객체 타입 변수

def json_to_object(json_data: str, obj_class: type) -> object:
    """
    JSON 데이터를 객체로 변환하는 유틸리티 함수
    :param json_data: JSON 형식의 문자열
    :param obj_class: 변환할 객체의 클래스
    :return: 변환된 객체
    """
    data = json.loads(json_data)
    return obj_class(**data)

class ModelMapper:
    def __init__(self, mapping: Dict[Type[T], Type[U]]):
        """
        입력 객체와 출력 객체 간의 매핑을 정의하는 딕셔너리를 받는 초기화 함수
        """
        self.mapping = mapping

    def map(self, obj: Dict) -> U:
        """
        입력 객체를 출력 객체로 변환하는 메서드
        """
        obj_type = type(obj)
        if obj_type not in self.mapping:
            raise ValueError(f"Mapping not found for object type: {obj_type}")

        target_type = self.mapping[obj_type]
        target_obj = target_type()

        for key, value in obj.items():
            if hasattr(target_obj, key):
                setattr(target_obj, key, value)

        return target_obj
    def sqlalchemy_to_object(self, obj: T) -> U:
        """
        SQLAlchemy 객체를 DTO 객체로 변환하는 메서드
        """
        obj_type = type(obj)
        if obj_type not in self.mapping.values():
            raise ValueError(f"Mapping not found for SQLAlchemy object type: {obj_type}")

        for dto_type, sqlalchemy_type in self.mapping.items():
            if sqlalchemy_type == obj_type:
                dto_obj = dto_type()
                for key, value in obj.__dict__.items():
                    if hasattr(dto_obj, key):
                        setattr(dto_obj, key, value)
                return dto_obj

    def object_to_sqlalchemy(self, obj: T) -> U:
        """
        DTO 객체를 SQLAlchemy 객체로 변환하는 메서드
        """
        obj_type = type(obj)
        if obj_type not in self.mapping:
            raise ValueError(f"Mapping not found for DTO object type: {obj_type}")

        for sqlalchemy_type, dto_type in self.mapping.items():
            if dto_type == obj_type:
                sqlalchemy_obj = sqlalchemy_type()
                for key, value in obj.__dict__.items():
                    if hasattr(sqlalchemy_obj, key):
                        setattr(sqlalchemy_obj, key, value)
                return sqlalchemy_obj
def sqlalchemy_to_object(player):
    roles = [role.roles for role in player.roles]
    fav_champs = [champ.fav_champs for champ in player.fav_champs]
    return Player(
        nick_name=player.nick_name,
        name=player.name,
        name_full=player.name_full,
        country=player.country,
        age=player.age,
        birth_date=player.birth_date,
        roles=roles,
        fav_champs=fav_champs
    )

def sqlalchemy_to_object_team(team):
    players = [sqlalchemy_to_object(player) for player in team.players]
    return Team(
        team_name=team.team_name,
        location=team.location,
        image=team.image,
        roster_photo=team.roster_photo,
        players=players
    )

def sqlalchemy_to_object_match(match):
    team1 = sqlalchemy_to_object_team(match.team1)
    team2 = sqlalchemy_to_object_team(match.team2)
    return Match(
        team1=team1,
        team2=team2,
        team1_score=match.team1score,
        team2_score=match.team2score,
        match_date=match.match_date
    )

def sqlalchemy_to_object_tournament(tournament):
    matches = [sqlalchemy_to_object_match(match) for match in tournament.matches]
    return Tournament(
        name=tournament.name,
        region=tournament.region,
        country=tournament.country,
        league=tournament.league,
        start_date=tournament.start_date,
        end_date=tournament.end_date,
        matches=matches
    )
def object_to_sqlalchemy(player_obj):
    roles = [ServerPlayerRole(server_player_id=player_obj.id, roles=role) for role in player_obj.roles]
    fav_champs = [ServerPlayerFavChamp(server_player_id=player_obj.id, fav_champs=champ) for champ in player_obj.fav_champs]
    return ServerPlayer(
        nick_name=player_obj.nick_name,
        name=player_obj.name,
        name_full=player_obj.name_full,
        country=player_obj.country,
        age=player_obj.age,
        birth_date=player_obj.birth_date,
        roles=roles,
        fav_champs=fav_champs
    )

def object_to_sqlalchemy_team(team_obj):
    players = [object_to_sqlalchemy(player) for player in team_obj.players]
    return ServerTeam(
        team_name=team_obj.team_name,
        location=team_obj.location,
        image=team_obj.image,
        roster_photo=team_obj.roster_photo,
        players=players
    )

def object_to_sqlalchemy_match(match_obj):
    team1_id = match_obj.team1.id if match_obj.team1 else None
    team2_id = match_obj.team2.id if match_obj.team2 else None
    return ServerMatch(
        team1score=match_obj.team1_score,
        team2score=match_obj.team2_score,
        match_date=match_obj.match_date,
        server_team1_id=team1_id,
        server_team2_id=team2_id
    )

def object_to_sqlalchemy_tournament(tournament_obj):
    matches = [object_to_sqlalchemy_match(match) for match in tournament_obj.matches]
    return ServerTournament(
        name=tournament_obj.name,
        region=tournament_obj.region,
        country=tournament_obj.country,
        league=tournament_obj.league,
        start_date=tournament_obj.start_date,
        end_date=tournament_obj.end_date,
        matches=matches
    )
