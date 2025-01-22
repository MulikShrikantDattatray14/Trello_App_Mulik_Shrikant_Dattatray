import { config } from "../config";

import { getAllItems } from "./api/get";
import {
  createBoard,
  createList,
  createCard,
  createChecklist,
  createChecklistItem,
} from "./api/post";
import { archiveList, updateChecklistItem } from "./api/put";
import { deleteItem } from "./api/delete";

export async function fetchBoards() {
  const url = `${config.baseBoardsUrl}?key=${config.key}&token=${config.token}`;

  const boardsData = await getAllItems(url);
  return boardsData;
}

export async function fetchLists(boardId) {
  const url = `${config.baseListsUrl}/${boardId}/lists?key=${config.key}&token=${config.token}`;

  const listsData = await getAllItems(url);
  return listsData;
}

export async function fetchCards(listId) {
  let url = `${config.baseCardsUrl}/${listId}/cards?key=${config.key}&token=${config.token}`;

  const cardsData = await getAllItems(url);
  return cardsData;
}

export const fetchChecklists = async (cardId) => {
  let url = `${config.baseChecklistsUrl}/${cardId}/checklists?key=${config.key}&token=${config.token}`;

  const checklists = await getAllItems(url);
  return checklists;
};

export async function createNewBoard(boardName) {
  const url = `${config.baseListsUrl}?key=${config.key}&token=${config.token}`;

  let newBoard = await createBoard(url, boardName);
  return newBoard;
}

export async function createNewList(BoardID, name) {
  const url = `${config.baseCardsUrl}?key=${config.key}&token=${config.token}`;

  let newList = await createList(url, name, BoardID);
  return newList;
}

export async function createNewCard(name, list) {
  const url = `${config.baseChecklistsUrl}?key=${config.key}&token=${config.token}`;

  let newCard = await createCard(url, name, list);
  return newCard;
}

export async function createNewChecklist(name, cardId) {
  let url = `${config.baseChecklistsUrl}/${cardId}/checklists?key=${config.key}&token=${config.token}`;

  let newChecklist = await createChecklist(name, url);
  return newChecklist;
}

export async function createNewChecklistItem(name, checklistId) {
  let url = `${config.baseChecklistItemUrl}/${checklistId}/checkItems?key=${config.key}&token=${config.token}`;

  let newChecklistItem = await createChecklistItem(name, url);
  return newChecklistItem;
}

export async function deleteBoardById(boardId) {
  let url = `${config.baseListsUrl}/${boardId}?key=${config.key}&token=${config.token}`;

  await deleteItem(url);
}

export async function archiveListById(listId) {
  let url = `${config.baseCardsUrl}/${listId}/closed?key=${config.key}&token=${config.token}`;

  await archiveList(url);
}

export async function deleteCardById(cardId) {
  let url = `${config.baseChecklistsUrl}/${cardId}?key=${config.key}&token=${config.token}`;

  await deleteItem(url);
}

export async function deleteChecklistById(checklistId) {
  let url = `${config.baseChecklistItemUrl}/${checklistId}?key=${config.key}&token=${config.token}`;

  await deleteItem(url);
}

export async function deleteChecklistItemById(checklistId, checklistItemId) {
  let url = `${config.baseChecklistItemUrl}/${checklistId}/checkItems/${checklistItemId}?key=${config.key}&token=${config.token}`;

  await deleteItem(url);
}

export async function updateChecklistItemById(itemId, newState, checklist) {
  let url = `${config.baseChecklistsUrl}/${checklist.idCard}/checkItem/${itemId}?key=${config.key}&token=${config.token}`;
  await updateChecklistItem(url, newState);
}
