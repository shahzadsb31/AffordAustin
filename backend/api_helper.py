from tables import *


def try_arg(name, arg):
    try:
        return arg[name]
    except KeyError:
        return None