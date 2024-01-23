/*
 * Copyright (C) 2024 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {AddDefaults} from 'parsers/operations/add_defaults';
import {SetFormatters} from 'parsers/operations/set_formatters';
import {TranslateIntDef} from 'parsers/operations/translate_intdef';
import {WM_DENYLIST_PROPERTIES} from 'parsers/window_manager/wm_denylist_properties';
import {WM_EAGER_PROPERTIES} from 'parsers/window_manager/wm_eager_properties';
import {WmProtoType} from 'parsers/window_manager/wm_proto_type';
import * as WmTamperedProtos from 'parsers/window_manager/wm_tampered_protos';
import {RECT_FORMATTER} from 'trace/tree_node/formatters';
import {Operation} from 'trace/tree_node/operations/operation';
import {PropertyTreeNode} from 'trace/tree_node/property_tree_node';
import {AddIsVisible} from './add_is_visible';
import {AddWindowType} from './add_window_type';

export interface OperationLists {
  common: Array<Operation<PropertyTreeNode>>;
  eager: Array<Operation<PropertyTreeNode>>;
  lazy: Array<Operation<PropertyTreeNode>>;
}

export const WM_OPERATION_LISTS = new Map<WmProtoType, OperationLists>([
  [
    WmProtoType.WindowManagerService,
    {
      common: [
        new SetFormatters(WmTamperedProtos.WindowManagerServiceField),
        new TranslateIntDef(WmTamperedProtos.WindowManagerServiceField),
      ],
      eager: [
        new AddDefaults(
          WmTamperedProtos.WindowManagerServiceType,
          WM_EAGER_PROPERTIES.get(WmProtoType.WindowManagerService)
        ),
      ],
      lazy: [
        new AddDefaults(
          WmTamperedProtos.WindowManagerServiceType,
          undefined,
          WM_DENYLIST_PROPERTIES.get(WmProtoType.WindowManagerService)
        ),
      ],
    },
  ],

  [
    WmProtoType.RootWindowContainer,
    {
      common: [
        new SetFormatters(WmTamperedProtos.RootWindowContainerField),
        new TranslateIntDef(WmTamperedProtos.RootWindowContainerField),
      ],
      eager: [
        new AddDefaults(
          WmTamperedProtos.RootWindowContainerType,
          WM_EAGER_PROPERTIES.get(WmProtoType.RootWindowContainer)
        ),
      ],
      lazy: [
        new AddDefaults(
          WmTamperedProtos.RootWindowContainerType,
          undefined,
          WM_DENYLIST_PROPERTIES.get(WmProtoType.RootWindowContainer)
        ),
      ],
    },
  ],

  [
    WmProtoType.WindowContainer,
    {
      common: [
        new SetFormatters(WmTamperedProtos.WindowContainerField),
        new TranslateIntDef(WmTamperedProtos.WindowContainerField),
      ],
      eager: [
        new AddDefaults(
          WmTamperedProtos.WindowContainerType,
          WM_EAGER_PROPERTIES.get(WmProtoType.WindowContainer)
        ),
        new AddIsVisible(),
      ],
      lazy: [
        new AddDefaults(
          WmTamperedProtos.WindowContainerType,
          undefined,
          WM_DENYLIST_PROPERTIES.get(WmProtoType.WindowContainer)
        ),
      ],
    },
  ],

  [
    WmProtoType.DisplayContent,
    {
      common: [
        new SetFormatters(WmTamperedProtos.DisplayContentField),
        new TranslateIntDef(WmTamperedProtos.DisplayContentField),
      ],
      eager: [
        new AddDefaults(
          WmTamperedProtos.DisplayContentType,
          WM_EAGER_PROPERTIES.get(WmProtoType.DisplayContent)
        ),
      ],
      lazy: [
        new AddDefaults(
          WmTamperedProtos.DisplayContentType,
          undefined,
          WM_DENYLIST_PROPERTIES.get(WmProtoType.DisplayContent)
        ),
      ],
    },
  ],

  [
    WmProtoType.DisplayArea,
    {
      common: [
        new SetFormatters(WmTamperedProtos.DisplayAreaField),
        new TranslateIntDef(WmTamperedProtos.DisplayAreaField),
      ],
      eager: [
        new AddDefaults(
          WmTamperedProtos.DisplayAreaType,
          WM_EAGER_PROPERTIES.get(WmProtoType.DisplayArea)
        ),
      ],
      lazy: [
        new AddDefaults(
          WmTamperedProtos.DisplayAreaType,
          undefined,
          WM_DENYLIST_PROPERTIES.get(WmProtoType.DisplayArea)
        ),
      ],
    },
  ],

  [
    WmProtoType.Task,
    {
      common: [
        new SetFormatters(WmTamperedProtos.TaskField),
        new TranslateIntDef(WmTamperedProtos.TaskField),
      ],
      eager: [
        new AddDefaults(WmTamperedProtos.TaskType, WM_EAGER_PROPERTIES.get(WmProtoType.Task)),
      ],
      lazy: [
        new AddDefaults(
          WmTamperedProtos.TaskType,
          undefined,
          WM_DENYLIST_PROPERTIES.get(WmProtoType.Task)
        ),
      ],
    },
  ],

  [
    WmProtoType.Activity,
    {
      common: [
        new SetFormatters(WmTamperedProtos.ActivityField),
        new TranslateIntDef(WmTamperedProtos.ActivityField),
      ],
      eager: [
        new AddDefaults(
          WmTamperedProtos.ActivityType,
          WM_EAGER_PROPERTIES.get(WmProtoType.Activity)
        ),
        new AddIsVisible(),
      ],
      lazy: [
        new AddDefaults(
          WmTamperedProtos.ActivityType,
          undefined,
          WM_DENYLIST_PROPERTIES.get(WmProtoType.Activity)
        ),
      ],
    },
  ],

  [
    WmProtoType.WindowToken,
    {
      common: [
        new SetFormatters(WmTamperedProtos.WindowTokenField),
        new TranslateIntDef(WmTamperedProtos.WindowTokenField),
      ],
      eager: [
        new AddDefaults(
          WmTamperedProtos.WindowTokenType,
          WM_EAGER_PROPERTIES.get(WmProtoType.WindowToken)
        ),
      ],
      lazy: [
        new AddDefaults(
          WmTamperedProtos.WindowTokenType,
          undefined,
          WM_DENYLIST_PROPERTIES.get(WmProtoType.WindowToken)
        ),
      ],
    },
  ],

  [
    WmProtoType.WindowState,
    {
      common: [
        new SetFormatters(
          WmTamperedProtos.WindowStateField,
          new Map([
            ['containingFrame', RECT_FORMATTER],
            ['parentFrame', RECT_FORMATTER],
          ])
        ),
        new TranslateIntDef(WmTamperedProtos.WindowStateField),
      ],
      eager: [
        new AddDefaults(
          WmTamperedProtos.WindowStateType,
          WM_EAGER_PROPERTIES.get(WmProtoType.WindowState)
        ),
        new AddWindowType(),
        new AddIsVisible(),
      ],
      lazy: [
        new AddDefaults(
          WmTamperedProtos.WindowStateType,
          undefined,
          WM_DENYLIST_PROPERTIES.get(WmProtoType.WindowState)
        ),
      ],
    },
  ],

  [
    WmProtoType.TaskFragment,
    {
      common: [
        new SetFormatters(WmTamperedProtos.TaskFragmentField),
        new TranslateIntDef(WmTamperedProtos.TaskFragmentField),
      ],
      eager: [
        new AddDefaults(
          WmTamperedProtos.TaskFragmentType,
          WM_EAGER_PROPERTIES.get(WmProtoType.TaskFragment)
        ),
      ],
      lazy: [
        new AddDefaults(
          WmTamperedProtos.TaskFragmentType,
          undefined,
          WM_DENYLIST_PROPERTIES.get(WmProtoType.TaskFragment)
        ),
      ],
    },
  ],
]);
