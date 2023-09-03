import { WalineResponse } from './typings.js';
import { type BaseAPIOptions, getFetchPrefix, errorCheck } from './utils.js';

export interface GetCommentCountOptions extends BaseAPIOptions {
  /**
   * 待获取评论数的 path
   *
   * Path of pages to be fetched
   */
  paths: string[];

  /**
   * 取消请求的信号
   *
   * AbortSignal to cancel request
   */
  signal?: AbortSignal;
}

export type WalineCommentCount = number[];

export const fetchCommentCount = ({
  serverURL,
  lang,
  paths,
  signal,
}: GetCommentCountOptions): Promise<WalineCommentCount> =>
  fetch(
    `${getFetchPrefix(serverURL)}comment?type=count&url=${encodeURIComponent(
      paths.join(','),
    )}&lang=${lang}`,
    { signal },
  )
    .then((resp) => <Promise<WalineResponse<number[]>>>resp.json())
    .then((data) => errorCheck(data, 'comment count'));
