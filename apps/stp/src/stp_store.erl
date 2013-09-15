-module(stp_store).

-export([get_answ/1]).

get_answ(List) ->
    [{Key, Value}|_T] = List,
    case Key of
        <<"vote">> ->
            Value;
        _ ->
            Value
    end.
    
