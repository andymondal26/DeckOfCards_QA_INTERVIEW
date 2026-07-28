"""Make the ``src`` layout importable when running pytest without installing.

This lets ``import deckofcards`` work straight from a clone. If you prefer, you
can instead run ``pip install -e .`` and delete this file.
"""

import os
import sys

_SRC = os.path.join(os.path.dirname(__file__), "src")
if _SRC not in sys.path:
    sys.path.insert(0, _SRC)
