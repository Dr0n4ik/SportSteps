-module(stp_app).

-behaviour(application).

-export([start/2, stop/1]).

-include("stp.hrl").

-define(DEFAULT_IP, {0, 0, 0, 0}).
-define(DEFAULT_PORT, 4588).

start(_Type, _Args) ->
    Dispatch = dispatch_rules(),
    Port = stp_lib:get_option(port, ?DEFAULT_PORT),
    IP = stp_lib:get_option(ip, ?DEFAULT_IP),
    {ok, _} = cowboy:start_http(http, 100,
            [{port, Port}, {ip, IP}],
            [{env, [{dispatch, Dispatch}]}]
    ),
    ?INFO("Starting web server on http://~s:~p",
        [inet_parse:ntoa(IP), Port]),
    stp_sup:start_link().

stop(_State) ->
    ok.

%% Internal functions

dispatch_rules() ->
    Static = fun(Type) ->
        {lists:append(["/", Type, "/[...]"]), cowboy_static, [
            {directory, {priv_dir, stp, [list_to_binary(Type)]}},
            {mimetypes, {fun mimetypes:path_to_mimes/2, default}}]
        
        }
    end,
    cowboy_router:compile([
        {'_', [
            Static("css"),
            Static("image"),
            Static("js"),
            {"/", cowboy_static, [
                {directory, {priv_dir, stp, []}},
                {file, "index.html"},
                {mimetypes, {fun mimetypes:path_to_mimes/2, default}}
            ]},
            {"/vote", vote_handler, []}
        ]}
    ]).
