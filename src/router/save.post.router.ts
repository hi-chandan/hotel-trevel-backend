import { Router } from "express";
import { wrapper } from "../utils/wrapper";
import { saveControl } from "../controller/save.post.control";
import { isAuth } from "../middleware/verifytoken";

const saveRouter = Router();

saveRouter.post(
  "/save/:id",
  isAuth,
  wrapper(saveControl.savePost.bind(saveControl)),
);
saveRouter.delete(
  "/save/:id",
  isAuth,
  wrapper(saveControl.deleteSavePost.bind(saveControl)),
);
saveRouter.get(
  "/saves",
  wrapper(isAuth),
  wrapper(saveControl.getSavePosts.bind(saveControl)),
);
saveRouter.get(
  "/saveslist",
  wrapper(isAuth),
  wrapper(saveControl.getListSave.bind(saveControl)),
);
saveRouter.get(
  "/save/:id",
  wrapper(isAuth),
  wrapper(saveControl.getSavePosts.bind(saveControl)),
);

export default saveRouter;
