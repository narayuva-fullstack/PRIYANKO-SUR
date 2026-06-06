from typing import Optional, List

class Node:
    """Represents a node in a binary tree."""
    def __init__(self, val: int = 0, left: Optional['Node'] = None, right: Optional['Node'] = None):
        self.val = val
        self.left = left
        self.right = right


class BST:
    """A simple Binary Search Tree implementation."""
    def __init__(self):
        self.root = None

    def insert(self, val: int) -> None:
        """Insert a value into the BST following BST rules."""
        if self.root is None:
            self.root = Node(val)
        else:
            self._insert(self.root, val)

    def _insert(self, current: Node, val: int) -> None:
        if val < current.val:
            if current.left is None:
                current.left = Node(val)
            else:
                self._insert(current.left, val)
        else:
            if current.right is None:
                current.right = Node(val)
            else:
                self._insert(current.right, val)

    @staticmethod
    def from_list(elements: List[int]) -> 'BST':
        """Helper to build a BST from a list of elements."""
        bst = BST()
        for el in elements:
            bst.insert(el)
        return bst


def is_identical(r1: Optional[Node], r2: Optional[Node]) -> bool:
    """Helper function to check if two binary trees are identical in structure and values."""
    if r1 is None and r2 is None:
        return True
    if r1 is None or r2 is None:
        return False
    return (
        r1.val == r2.val 
        and is_identical(r1.left, r2.left) 
        and is_identical(r1.right, r2.right)
    )


def is_subtree(t: Optional[Node], s: Optional[Node]) -> bool:
    """
    Checks if binary tree s is a subtree of binary tree t.
    A subtree of a tree t is a tree s consisting of a node in t and all of its descendants in t.
    """
    # An empty tree is always a subtree of any tree (including another empty tree)
    if s is None:
        return True
    # If t is empty but s is not, s cannot be a subtree
    if t is None:
        return False
    
    # Check if the tree rooted at t is identical to s
    if is_identical(t, s):
        return True
        
    # Recurse on left and right subtrees of t
    return is_subtree(t.left, s) or is_subtree(t.right, s)
