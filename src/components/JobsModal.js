import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from './ui/dialog.jsx';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Label } from './ui/label.jsx';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './ui/select.jsx';
import { Badge } from './ui/badge.jsx';
import { MapPin, Briefcase, DollarSign, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { JOBS } from '@/data/jobs';

export const JobsModal = ({ isOpen, onClose, onApply }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    if (isOpen) fetchJobs();
  }, [isOpen]);

  useEffect(() => {
    let filtered = [...jobs];
    if (filterType !== 'all') filtered = filtered.filter(j => j.type === filterType);
    if (filterLocation) filtered = filtered.filter(j =>
      j.location.toLowerCase().includes(filterLocation.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [filterType, filterLocation, jobs]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('posted_date', { ascending: false });

      if (error) throw error;
      const source = data && data.length > 0 ? data : JOBS;
      setJobs(source);
      setFilteredJobs(source);
    } catch (err) {
      // Fallback to static jobs if Supabase isn't configured yet
      setJobs(JOBS);
      setFilteredJobs(JOBS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto" data-testid="jobs-modal">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-[#0e1629]">Open Positions</DialogTitle>
          <DialogDescription className="text-gray-600">Explore our current job opportunities</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 py-4 border-b">
          <div>
            <Label className="text-[#0e1629] mb-2 block">Job Type</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger data-testid="job-filter-type">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Permanent">Permanent</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-[#0e1629] mb-2 block">Location</Label>
            <Input
              placeholder="Filter by location..."
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              data-testid="job-filter-location"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#3c83f5]" />
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No jobs found matching your criteria</p>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:border-[#3c83f5] transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#0e1629] mb-1">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <Badge className="bg-[#3c83f5] text-white">{job.type}</Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1"><MapPin size={16} />{job.location}</span>
                  <span className="flex items-center gap-1"><Briefcase size={16} />{job.experience}</span>
                  {job.salary_range && (
                    <span className="flex items-center gap-1"><DollarSign size={16} />{job.salary_range}</span>
                  )}
                </div>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="outline" className="border-[#3c83f5] text-[#3c83f5]">{skill}</Badge>
                  ))}
                </div>
                <Button onClick={() => onApply(job)} className="bg-[#3c83f5] hover:bg-[#1a6ae8] text-white">
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
