// Copyright (C) 2024 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use std::collections::BTreeMap;

use crates_index::Dependency;

mod android_target;
pub use android_target::AndroidTarget;

mod dependency_diff;
pub use dependency_diff::DependencyDiffer;

mod feature;
pub use feature::{FeatureRef, FeaturesAndOptionalDeps};

mod feature_diff;
pub use feature_diff::{FeatureDiff, FeatureDiffer};

mod feature_resolver;
pub use feature_resolver::FeatureResolver;

mod index;
pub use index::CratesIoIndex;
use semver::VersionReq;
use thiserror::Error;

type DepSet<'a> = BTreeMap<&'a str, &'a Dependency>;

pub trait ParsedVersionReq {
    fn parsed_version_req(&self) -> Result<VersionReq, semver::Error>;
}

impl ParsedVersionReq for Dependency {
    fn parsed_version_req(&self) -> Result<VersionReq, semver::Error> {
        VersionReq::parse(self.requirement())
    }
}

#[allow(missing_docs)]
#[derive(Error, Debug)]
pub enum Error {
    #[error("Crate {0} not found in crates.io")]
    CrateNotFound(String),
    #[error("Feature {0} not found for crate {1}")]
    FeatureNotFound(String, String),
    #[error("Dependency {0} not found for crate {1}")]
    DepNotFound(String, String),
    #[error("Failed to get HTTP headers")]
    HttpHeader,
    #[error("reqwest::Error: {0}")]
    Reqwest(#[from] reqwest::Error),
    #[error("crates_index::Error: {0}")]
    CratesIndex(#[from] crates_index::Error),
    #[error("crates_index::http::Error: {0}")]
    CratesIndexHttp(#[from] crates_index::http::Error),
}
