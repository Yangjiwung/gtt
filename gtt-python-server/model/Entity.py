from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum, BigInteger,create_engine
from sqlalchemy.orm import relationship,declarative_base
import enum

engine = create_engine("mysql+pymysql://gtt:gtt@sorune.asuscomm.com:13917/gtt",pool_recycle=3600)
Base = declarative_base()

class RoleEnum(enum.Enum):
    Top = 'Top'
    Mid = 'Mid'
    Bot = 'Bot'
    Support = 'Support'
    Jungle = 'Jungle'

class ServerPlayer(Base):
    __tablename__ = 'server_player'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    age = Column(Integer)
    birth_date = Column(DateTime)
    country = Column(String)
    name = Column(String)
    name_full = Column(String)
    nick_name = Column(String)
    team_img = Column(String)

    roles = relationship("ServerPlayerRole", back_populates="player")
    fav_champs = relationship("ServerPlayerFavChamp", back_populates="player")
    team = relationship("ServerTeam",secondary="server_team_server_players" ,back_populates="players")
class ServerPlayerRole(Base):
    __tablename__ = 'server_player_roles'

    server_player_id = Column(BigInteger, ForeignKey('server_player.id'), primary_key=True)
    roles = Column(Enum(RoleEnum))

    player = relationship("ServerPlayer", back_populates="roles")

class ServerPlayerFavChamp(Base):
    __tablename__ = 'server_player_fav_champs'

    server_player_id = Column(BigInteger, ForeignKey('server_player.id'), primary_key=True)
    fav_champs = Column(String)

    player = relationship("ServerPlayer", back_populates="fav_champs")

class ServerTeam(Base):
    __tablename__ = 'server_team'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    image = Column(String)
    location = Column(String)
    roster_photo = Column(String)
    team_name = Column(String)

    players = relationship("ServerPlayer", secondary="server_team_server_players", back_populates="team")

class ServerTeamServerPlayer(Base):
    __tablename__ = 'server_team_server_players'

    server_team_id = Column(BigInteger, ForeignKey('server_team.id'), primary_key=True)
    server_players_id = Column(BigInteger, ForeignKey('server_player.id'), primary_key=True)

class ServerMatch(Base):
    __tablename__ = 'server_match'

    match_id = Column(BigInteger, primary_key=True, autoincrement=True)
    league = Column(String)
    match_date = Column(DateTime)
    team1score = Column(BigInteger)
    team2score = Column(BigInteger)
    server_team1_id = Column(BigInteger, ForeignKey('server_team.id'))
    server_team2_id = Column(BigInteger, ForeignKey('server_team.id'))

    team1 = relationship("ServerTeam", foreign_keys=[server_team1_id])
    team2 = relationship("ServerTeam", foreign_keys=[server_team2_id])
    tournament = relationship("ServerTournament",secondary="server_tournament_server_matches",back_populates="matches")

class ServerTournament(Base):
    __tablename__ = 'server_tournament'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    country = Column(String)
    end_date = Column(DateTime)
    league = Column(String)
    name = Column(String)
    region = Column(String)
    start_date = Column(DateTime)
    challenger = Column(String)

    matches = relationship("ServerMatch", secondary="server_tournament_server_matches", back_populates="tournament")

class ServerTournamentServerMatch(Base):
    __tablename__ = 'server_tournament_server_matches'

    server_tournament_id = Column(BigInteger, ForeignKey('server_tournament.id'), primary_key=True)
    server_matches_match_id = Column(BigInteger, ForeignKey('server_match.match_id'), primary_key=True)
