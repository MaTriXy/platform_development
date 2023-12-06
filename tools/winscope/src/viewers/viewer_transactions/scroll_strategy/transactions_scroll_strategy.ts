/*
 * Copyright 2023, The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {VariableHeightScrollStrategy} from 'viewers/common/variable_height_scroll_strategy';
import {UiDataEntry} from 'viewers/viewer_transactions/ui_data';

export class TransactionsScrollStrategy extends VariableHeightScrollStrategy {
  protected readonly defaultRowSize = 24;
  private readonly whatCharsPerRow = 40;
  private readonly timestampCharsPerRow = 20;

  protected override predictScrollItemHeight(entry: UiDataEntry): number {
    const whatHeight = this.subItemHeight(entry.what, this.whatCharsPerRow);
    const timestampHeight = this.subItemHeight(entry.time, this.timestampCharsPerRow);
    return Math.max(whatHeight, timestampHeight);
  }
}
