-module(vote_handler).

-export([init/3, handle/2, terminate/3]).

init(_Transport, Req, []) ->
    {ok, Req, undefined}.

handle(Req, State) ->
    {Method, Req2} = cowboy_req:method(Req),
    {List, Req3} = cowboy_req:qs_vals(Req2),
    io:format("~p~n", [List]),
    {ok, Req4} = vote(Method, List, Req3),
    {ok, Req4, State}.

vote(<<"GET">>, undefined, Req) ->
    cowboy_req:reply(400, [], <<"Missing vote parametr.">>, Req);
vote(<<"GET">>, List, Req) ->
    Answer = stp_store:get_answ(List),
    cowboy_req:reply(200, [{<<"content-type">>, <<"application/json">>}],
        Answer, Req);
vote(_, _, Req) ->
    %% Method not allowed
    cowboy_req:reply(405, Req).

terminate(_Reason, _Req, _State) ->
    ok.
