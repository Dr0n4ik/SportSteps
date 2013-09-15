-module(stp).

%% API
-export([start/0, stop/0]).

start() ->
    ok = application:start(lager),
    ok = application:start(crypto),
    ok = application:start(ranch),
    ok = application:start(cowboy),
    ok = application:start(stp).

stop() ->
    ok = application:stop(stp),
    ok = application:stop(cowboy),
    ok = application:stop(ranch),
    ok = application:stop(crypto),
    ok = application:stop(lager).
